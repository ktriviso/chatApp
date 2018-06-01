import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Profile from '../profile/profile'
import './header.css'

export default class Header extends Component {

  constructor(props){
    super(props)
    this.state={
      isModalOpen: false
    }
  }

  openModal = () => {
    console.log('im clicked')
    this.setState({ isModalOpen: true})
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div>
        <header className="header">
          <ul className='site_nav'>
            <Link to="/"><li id="logout" onClick={window.localStorage.clear()}>Logout</li></Link>

                  <button onClick={this.openModal}>Profile</button>
                  <Profile data={this.props.data} isOpen={this.state.isModalOpen} onClose={this.closeModal}/>

            <Link to="/chat"><li>Chatroom</li></Link>
          </ul>
        </header>
      </div>
    )
  }
}
