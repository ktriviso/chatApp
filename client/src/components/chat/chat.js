import React, { Component } from 'react'
import socket from '../../socket/api'
import Header from '../header/header'
import PrivateChats from './private/privateChats'
import ActiveChat from './active/activeChat'
import './chat.css'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      room: '',
      privateChats: [],
      isModalOpen: false,
      currentUser: props.history.location.state.data,
      activeChat: {
        room: 'main',
        messages: []
      }
    }
  }

  componentDidMount() {
    const { currentUser } = this.state
    console.log(currentUser)
    socket.emit('current user', currentUser)
    socket.on('user activated', (user, users) => this.handleActiveUsers(user, users))
    socket.on('passing room state', (data) => {
      console.log(data)
      this.replaceActiveChat(data)
    })
  }

  handleActiveUsers = ({ username }, otherActiveUsers) => {
    const { currentUser } = this.state
    const idGenerator = () =>
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)

    function getUserInfo() {
      console.log(this)
      const recipient = this.getAttribute('name')
      const sender = currentUser.username
      const room = idGenerator()
      socket.emit('new private room', { recipient, sender, room })
    }

    if (username) {
      const list_group = document.querySelector('.list-group')
      const li = document.createElement('li')
      li.innerHTML = username
      li.setAttribute('name', username)
      li.className = 'active_users'
      li.addEventListener('click', getUserInfo)
      list_group.appendChild(li)
    }  

    if (otherActiveUsers.length > 0) {
      otherActiveUsers.forEach(user => {
        if (user.username !== username) {
          const list_group = document.querySelector('.list-group')
          const li = document.createElement('li')
          console.log(this)
          li.innerHTML = user.username
          li.setAttribute('name', user.username)
          li.className = 'active_users'
          li.addEventListener('click', getUserInfo)
          list_group.appendChild(li)
        }
      })
    }
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

    return (
      <div>
        <Header data={this.state.currentUser} />
        <div className="chat_component">
          <PrivateChats replaceActiveChat={this.replaceActiveChat} />
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

export default Chat
