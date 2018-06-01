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

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// receiving the fetch call from the login on the front end

var user = ''
app.post('/login', (req, res) => {
  user = req.body
  console.log(req.body.username)
  // const userObject = db.getUser(req.body.username)
  if(userObject.username !== req.body.username || userObject.password !== req.body.password){
    console.log('incorrect login information, please try again or register as a new user')
  } else if(userObject.username === req.body.username && userObject.password === req.body.password){
    console.log('correct password, user is logged in')
  } else if (userObject.username === req.body.username && userObject.password !== req.body.password) {
    console.log('incorrect password, try again')
  }

  // db.addUser(req.body.username, req.body.password)
  // db.createReference(1, req.body.username)

  res.send(user)
})

// always server index.html from any route
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

const updateUserNames = () => {
  io.emit('get users', users)
  // console.log(users)
}

io.on('connection', socket => {
  connections.push(socket)
  console.log('connected: %s sockets connected', connections.length)

  var room = db.viewChatroom(1)
  console.log(room)
  // this is not giving me what i expect. i want the room back.
  // its currently returning Promise { <pending> }
  io.emit('new room', room)

  socket.on('send message', data => {
    console.log('look here', data)
    // db.storeMessage(data.message, data.username, data.chatroom)
    io.emit('new message', data)



    // socket.broadcast.emit('new message', data)
    // console.log(data)

  })



  socket.on('new user', (userName, callback) => {
    console.log(userName)
    console.log(callback)
    callback(true)
    socket.username = userName
    users.push(socket.username)
    updateUserNames()
  })

  io.on('disconnect', () => {
    users.splice(users.indexOf(socket.username), 1)
    updateUserNames()
    connections.splice(connections.indexOf(socket), 1)
    console.log('disconnected: %s sockets connected', connections.length)
    socket.broadcast.to(socket.chatroom).emit('user disconnect', name);
  })
})

server.listen(process.env.PORT || 3001)
