import React, { Component } from 'react'
import NewPrivateChat from './newPrivateChat'
import socket from '../../../socket/api'
import './private.css'


// PARENT COMPONENT
class PrivateChats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      privateChats: [],
      openModal: false,
    }
  }

  openModal = e => {
    e.preventDefault()
    document.querySelector('.modal').classList.add('modal--is-open')
  }

  addNewChat = (chatroom) => {
    this.setState({ privateChats: [...this.state.privateChats, chatroom] })
  }

  setActiveChat = (e) => {
    e.preventDefault()
    const room = e.target.getAttribute('data')
    console.log(room)
    socket.emit('current room', room)
  }

  componentDidMount() {
    socket.on('create new chat', (newChatroom) => this.addNewChat(newChatroom))
  }


  render() {
    return (
      <div className="rooms">
        {this.state.privateChats.map((chatroom, i) => (
          <li data={chatroom.room} key={i} onClick={this.setActiveChat}>{chatroom.room}</li>
        ))}
        <NewPrivateChat openModal={this.state.openModal} addNewChat={this.addNewChat} />
        <div className="modal_button">
          <button onClick={this.openModal}>+</button>
        </div>
      </div>
    )
  }
}

export default PrivateChats
