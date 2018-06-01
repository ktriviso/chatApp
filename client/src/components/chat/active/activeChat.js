import React, {Component} from 'react'
import socket from '../../../socket/api'

class ActiveChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chatroom: {},
      messages: []
    }
  }
  componentWillMount() {
    console.log(this.props.chatroom)
    this.setState({
      chatroom: this.props.chatroom
    })
  }
  componentDidMount() {
    
    socket.on('new message', (msg) => {
      console.log(msg)
      console.log(this.state.messages)
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
  }

  render() {
    return (
      <div>
        <h3>{this.state.chatroom.room ? this.state.chatroom.room : 'Main Chat'}</h3>
        <ul className="users_chats">
        {this.state.messages ? this.state.messages.map((message) => (
          <li>
            {message.user.username}: {message.message}
          </li>
        )) : "No Message History"}
      </ul>
      </div>
    )
  }
}

export default ActiveChat
