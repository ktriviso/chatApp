import socketIOClient from 'socket.io-client'
const endpoint = 'http://localhost:3001/'
const socket = socketIOClient(endpoint)
export default socket
