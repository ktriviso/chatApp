import React, {Component } from 'react'
import socket from '../../../socket/api'
import './private.css'

// PARENT COMPONENT
class PrivateChats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      privateChats: [],
    }
  }

  addNewChat = (chatroom) => {
    this.setState({
      privateChats: [...this.state.privateChats, chatroom]
    })
  }

  setActiveChat = (e) => {
    e.preventDefault()
    const room = e.target.getAttribute('data')
    socket.emit('current room', room)
  }

  componentDidMount() {
    socket.on('create new chat', (newChatroom) => {
      this.addNewChat(newChatroom)
    })

    const rooms = document.querySelector('.rooms')
    this.props.userRooms.map((room, i) => {
      const li = document.createElement('li')
      li.innerHTML = room
      li.setAttribute('data', room)
      li.classList.add('prevMessages');
      rooms.appendChild(li)
      rooms.addEventListener('click', this.setActiveChat)
    })
  }

  render() {
    return (
      <div className = "rooms" > {
        this.state.privateChats.map((chatroom, i) => (
          <li data = {chatroom.room} key={i} onClick={this.setActiveChat}>
            {chatroom.room}
          </li>
        ))
      }
      </div>
    )
  }
}

export default PrivateChats
