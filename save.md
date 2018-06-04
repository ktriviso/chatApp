*** THIS IS ANOTHER VERSION OF ACTIVE CHAT THAT I TRIED BUT IT WASN'T WORKING PROPERLY EITHER
SAVING THIS JUST IN CASE ***

import React, {Component} from 'react'
import socket from '../../../socket/api'

export default class ActiveChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatroom: {},
      messages: []
    }
  }

  componentWillMount() {
    this.setState({
      chatroom: this.props.chatroom
    })
  }

  componentDidMount() {
    socket.on('new message', (msg) => {
      console.log(msg)
      let newMess = this.state.messages
      newMess.push(msg)
      this.setState({ messages: newMess })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.chatroom.room !== this.props.chatroom.room) {
      this.setState({
        chatroom: this.props.chatroom
      })
    }

    if(prevProps.chatroom.messages !== this.props.chatroom.messages){
      const prev_chats = document.querySelector('#prev_chats')
      if(prev_chats){
        const children = prev_chats.childNodes
        children.forEach((elem) => {
          elem.remove()
        })
      }

      if(this.props.chatroom.messages){
        this.props.chatroom.messages.map((elem) => {
          const li = document.createElement('li')
          li.innerHTML = `${elem.name}: ${elem.content}`
          prev_chats.appendChild(li)
        })
      }
    }
  }

  render() {

    return (
      <div>
        <h3>{this.state.chatroom.room ? this.state.chatroom.room : 'Chat.io'}</h3>
        <ul id="prev_chats"></ul>
        <ul className="users_chats">
        {this.state.messages ? this.state.messages.map((message, i) => (
          <li key={i}>
            {message.user.username}: {message.message}
          </li>
        )) : "No Message History"}
      </ul>
      </div>
    )
  }
}
import React, {Component} from 'react'
import socket from '../../../socket/api'

export default class ActiveChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatroom: {},
      messages: []
    }
  }

  componentWillMount() {
    this.setState({
      chatroom: this.props.chatroom
    })
  }

  componentDidMount() {
    socket.on('new message', (msg) => {
      console.log('this shouldnt be sohowing up in all rooms')
      console.log(msg)
      let newMess = this.state.messages
      newMess.push(msg)
      this.setState({ messages: newMess })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.chatroom.room !== this.props.chatroom.room) {
      this.setState({
        chatroom: this.props.chatroom
      })
    }

    if(prevProps.chatroom.messages !== this.props.chatroom.messages){
      const prev_chats = document.querySelector('#prev_chats')
      if(prev_chats){
        const children = prev_chats.childNodes
        children.forEach((elem) => {
          elem.remove()
        })
      }

      if(this.props.chatroom.messages){
        this.props.chatroom.messages.map((elem) => {
          const li = document.createElement('li')
          li.innerHTML = `${elem.name}: ${elem.content}`
          prev_chats.appendChild(li)
        })
      }
    }
  }

  render() {

    return (
      <div>
        <h3>{this.state.chatroom.room ? this.state.chatroom.room : 'Chat.io'}</h3>
        <ul id="prev_chats"></ul>
        <ul className="users_chats">
        {this.state.messages ? this.state.messages.map((message, i) => (
          <li key={i}>
            {message.user.username}: {message.message}
          </li>
        )) : "No Message History"}
      </ul>
      </div>
    )
  }
}
