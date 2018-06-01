import socketIOClient from 'socket.io-client'
/*
  =============================================================================================

  So in a couple of the examples I saw, and some of the documentation
  they were instantiating a socket object multiple times throughout the application
  and even in the same component...that seemed dumb

  Additionally, I noticed on the backend server that there were like 11 connections
  to the socket which was also...dumb.

  So I extracted the socketIO client to this file, so it only instantiates once but its 
  methods are available throughout the entire application. It cut the connections on the
  backend down to one.

  PS. I LOVE YOU
  =============================================================================================
*/

const endpoint = 'http://localhost:3001/'
const socket = socketIOClient(endpoint)
export default socket