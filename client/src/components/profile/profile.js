import React from 'react';
import './profile.css';

export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }

  componentDidMount(){
    if(this.props.userRooms){
      const profile_rooms_list = document.querySelector('#profile_rooms_list')
      this.props.userRooms.map((elem) => {
        const li = document.createElement('li')
        li.innerHTML = `${elem}`
        profile_rooms_list.appendChild(li)
      })
    }
  }
  
  render () {
    const user = this.props.data.username
    const { isOpen, onClose } = this.props;
    const count = this.props.userRooms.length

    return (
      <div id="modal" className={isOpen ? 'open' : 'closed'}>
        <p>Hello, {user}! Welcome to your profile! <br/> You are part of {count} chat(s) <br/> Here is a list of your current rooms.</p>
        <ul id="profile_rooms_list"></ul>
        <button id="close_button" onClick={onClose}>close</button>
      </div>
    );
  }
}
