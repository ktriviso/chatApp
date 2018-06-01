import React, { Component } from 'react'
import socket from '../../../socket/api'
import './private.css'


export default class NewPrivateChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      privateChats: []
    }
  }
  componentWillMount() {
    this.setState({
      openModal: this.props.openModal
    })
  }
  componentDidMount() {
    
    
  }
  addNewChat = e => {
    e.preventDefault()
    const { recipient, sender, room } = this.state
    // socket.emit('new private room', { recipient, sender, room })
  }

  recipientInput = e => {
    e.preventDefault()

    const idGenerator = () => {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    this.setState({
      recipient: e.target.value,
      room: idGenerator()
    })
  }

  senderInput = e => {
    e.preventDefault()
    this.setState({
      sender: e.target.value
    })
  }


  onClose = () => document.querySelector('.modal').classList.remove('modal--is-open')

  render() {
    const { recipient, sender } = this.state

    return (
      <div className={this.props.openModal ? 'modal modal--is-open' : 'modal'}>
        <form onSubmit={this.addNewChat}>
          <input type="text" value={recipient} onChange={this.recipientInput} placeholder="recipient name" />
          <br />
          <input type="text" value={sender} onChange={this.senderInput} placeholder="sender name" />
          <br />
          <button className="btn modal_btn" type="submit" onClick={this.onClose}>
            Send
          </button>
        </form>
        <div className="close" onClick={this.onClose}>
          X
        </div>
      </div>
    )
  }
}
