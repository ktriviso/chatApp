import React, { Component } from 'react'
import socket from '../../socket/api'
import Header from '../header/header'
import PrivateChats from './private/privateChats'
import ActiveChat from './active/activeChat'
import './chat.css'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      room: '',
      privateChats: [],
      isModalOpen: false,
      currentUser: props.history.location.state.data,
      userRooms : props.history.location.state.userRooms,
      activeChat: {
        room: 'main',
        messages: []
      }
    }
  }

  componentDidMount() {
    console.log(this.props.history.location.state.userRooms)
    const { currentUser } = this.state
    socket.emit('current user', currentUser)

    socket.on('user activated', (users) => {
      this.handleActiveUsers(users)
    })
    socket.on('passing room state', (data) => {
      this.replaceActiveChat(data)
    })
  }

  handleActiveUsers = ({ username }) => {
    const { currentUser } = this.state
    const idGenerator = () =>
      Math.random()
        .toString(36)
        .substring(2, 5)
    function getUserInfo() {
      const recipient = this.getAttribute('name')
      const sender = currentUser.username
      const room = idGenerator()
      if(recipient !== sender){
        socket.emit('new private room', { recipient, sender, room })
      } else {
        alert('why you tryin to message yourself dude?')
      }

    }

    if(username){
      const list_group = document.querySelector('.list-group')
      const li = document.createElement('li')
      li.innerHTML = username
      li.setAttribute('name', username)
      li.className = 'active_users'
      li.addEventListener('click', getUserInfo)
      list_group.appendChild(li)
    }

// this got really buggy and needs fixing. I woudl like it to work but for now its commented out
    // if (otherActiveUsers.length > 0) {
    //   console.log(otherActiveUsers)
    //   otherActiveUsers.forEach(user => {
    //     if (user.username !== username) {
    //       const list_group = document.querySelector('.list-group')
    //       const li = document.createElement('li')
    //       li.innerHTML = user.username
    //       li.setAttribute('name', user.username)
    //       li.className = 'active_users'
    //       li.addEventListener('click', getUserInfo)
    //       list_group.appendChild(li)
    //     }
    //   })
    // }
  }

  componentWillUnmount() {
    socket.disconnect()
  }

  replaceActiveChat = data => {
    this.setState({
      activeChat: {
        room: data.room,
        messages: data.messages
      }
    })
  }

  sendMessage = e => {
    e.preventDefault()
    const { message, currentUser } = this.state
    const data = {
      message: message,
      user: currentUser,
      chatroom: this.state.activeChat
    }
    console.log(data)
    socket.emit('send message', data)
  }

  updateMessage = e => {
    e.preventDefault()
    this.setState({
      message: e.target.value
    })
  }

  render() {
    const { activeChat } = this.state
    console.log(activeChat)
    console.log(this.state.userRooms)

    return (
      <div>
        <Header data={this.state.currentUser} userRooms={this.state.userRooms}/>
        <div className="chat_component">
          <PrivateChats replaceActiveChat={this.replaceActiveChat} userRooms={this.state.userRooms}/>
          <div className="active">
            <section>
              <h3>online users</h3>
              <ul className="list-group" id="users" />
            </section>
          </div>
          <div className="chat">
            <ActiveChat chatroom={activeChat} />
            <form className="" id="messageForm" onSubmit={this.sendMessage}>
              <textarea id="message" value={this.state.message} onChange={this.updateMessage} />
              <button className="btn" type="submit">
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
