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
      console.log(msg.message, msg.user.username)
      //this is working, its sending the the correct chatroom but i cant figure out why its showing up on the main and private channels.
      let newMess = this.state.messages
      newMess.push({message: msg.message, user: msg.user.username})
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
      // const prev_chats = document.querySelector('#prev_chats')
      // if(prev_chats){
      //   const children = prev_chats.childNodes
      //   children.forEach((elem) => {
      //     elem.remove()
      //   })
      // }

      if(this.props.chatroom.messages){
        this.props.chatroom.messages.map((elem) => {
          // const li = document.createElement('li')
          // li.innerHTML = `${elem.name}: ${elem.content}`
          // prev_chats.appendChild(li)
          console.log(elem.content, elem.name)

          let newMess = this.state.messages
          newMess.push({message: elem.content, user: elem.name})
          this.setState({ messages: newMess })
        })
      }
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    return (
      <div>
        <h3>{this.state.chatroom.room ? this.state.chatroom.room : 'Chat.io'}</h3>
        <ul id="prev_chats"></ul>
        <ul className="users_chats">
        {this.state.messages ? this.state.messages.map((message, i) => (
          <li key={i}>
            {message.user}: {message.message}
          </li>
        )) : "No Message History"}
      </ul>
      </div>
    )
  }
}
