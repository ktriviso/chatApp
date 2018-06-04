const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const router = './router'
const db = require('./models/model');
const bodyParser = require('body-parser');

const users = []
const connections = []
let currentUser = ''
const usersRooms = []

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

const authenticateUser = async (req) => {
  const {username, password} = req.body
  const existingUser = await db.getUser(username, password)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  if(existingUser) {
    return existingUser
  } else {
    return false
  }
}

const addUser = async (req) => {
  const {username, password} = req.body
  const existingUser = await db.getUser(username, password)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
    })
    if(!existingUser) {
      let newUser = await db.addUser(username, password).then((res) => {
        return res
      }).catch((err) => {
        console.log(err)
      })
      return newUser
    }
}

app.post('/register', async (req, res) => {
  let addedUser = await addUser(req)
  res.body = addedUser
  res.send({addedUser})
})

app.post('/login', async (req, res) => {
  let authenticatedUser = await authenticateUser(req)
  let messages = await db.selectMessages(authenticatedUser.username)
  .then((res) => {
    return res
  })
  .catch((err) => {
    console.log(err)
  })
  // Messages will come back undefined if this is a first time user so we need to handle that
  messages = (messages && messages.length > 0) ? messages : []
  res.body = authenticatedUser
  res.send([messages, {authenticatedUser}])
 })

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

io.on('connection', socket => {
  connections.push(socket)
  console.log('connected: %s sockets connected', connections.length)

  socket.on('current user', async (user) => {
    db.createReference('main', user.username)
    users.push(user)
    const rooms = await db.returnReferences(user.username)
    rooms.forEach((room) => {
      socket.join(room.chatroom);
      usersRooms.push(room.chatroom)
    })
    io.emit('user activated', user)
  })

  socket.on('new private room', async (data) => {
    const checkpointOne = await db.checkRoomsExistence(data.sender, data.recipient)
    .then((res) => {
      return true
    })
    .catch((err) => {
      return false
    })
    const checkpointTwo = await db.checkRoomsExistence(data.recipient, data.sender)
    .then((res) => {
      return true
    })
    .catch((err) => {
      return false
    })

    if(!checkpointOne && !checkpointTwo){
      db.createChatroom(data.room, data.sender, data.recipient)
      db.createReference(data.room, data.sender)
      db.createReference(data.room, data.recipient)
      io.emit('create new chat', data)
    } else {
      const msg = 'there is already a private chat between these users'
      io.emit('create new chat', msg)
    }
  })

  socket.on('current room', async(room) => {
    const messages = await db.returnMessagesByChatroom(room)
      .then((res) => {
        return res
      }).catch((err) => {
        console.log(err)
      })
      let data = {
        room: room,
        messages: messages
      }
    io.emit('passing room state', data)
  })

  socket.on('check user', (data) => {
    db.getUser(data.userName, data.password)
      .then((user) => {
        io.emit('auth', user)
      })
      .catch((err) => {
        io.emit('auth' , null)

      })
  })

// this is the most important part! this is where it sends the messges to the specific room
  socket.on('send message', data => {
    db.storeMessage(data.message, data.user.username, data.chatroom.room)
    io.sockets.in(data.chatroom.room).emit('new message', data);
  })

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.username), 1)
    connections.splice(connections.indexOf(socket), 1)
    console.log('disconnected: %s sockets connected', connections.length)
  })

})

server.listen(process.env.PORT || 3001)
