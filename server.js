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
      console.log("Existing user ", res)
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
      console.log("Existing user ", res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
    if(!existingUser) {
      let newUser = await db.addUser(username, password).then((res) => {
        console.log("New user ", res)
        db.createReference(1, res.username)
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
  console.log('these should be the users messages')
  console.log(messages)
  res.body = authenticatedUser
  res.send([messages, {authenticatedUser}])
 })

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

io.on('connection', socket => {
  connections.push(socket)
  console.log('connected: %s sockets connected', connections.length)


  db.viewChatroom(1).then(data => {
    console.log(data)
    io.emit('new room', data)
    io.emit('active users', users)
  })

  socket.on('current user', (user) => {
    users.push(user)
    // this will log in the server all the users that are active 
    console.log(user)
    console.log(users)
    io.emit('user activated', user, users)
    // io.emit('active users', users)
  })

  socket.on('new private room', (data) => {
    console.log('im the new room the user made')
    console.log(data)

    io.emit('create new chat', data)
    db.createChatroom(data.room)
  })

  socket.on('current room', async(room) => {
    /*
    When user changes chats this is where we request all the messages saveed to the new current chatroom and return them to the 
    front end to display in the active chat
    */
    const messages = await db.returnMessagesByChatroom(room)
      .then((res) => {
        console.log(res)
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
    console.log('chceking me')
    console.log(data)
    db.getUser(data.userName, data.password)
      .then((user) => {
        io.emit('auth', user)
      })
      .catch((err) => {
        io.emit('auth' , null)

      })
  })

  socket.on('send message', data => {
    db.storeMessage(data.message, data.user.username, data.chatroom.room)
    io.emit('new message', data)
  })

  socket.on('disconnect', () => {
    // users.splice(users.indexOf(socket.username), 1)
    connections.splice(connections.indexOf(socket), 1)
    console.log('disconnected: %s sockets connected', connections.length)
  })

})

server.listen(process.env.PORT || 3001)
