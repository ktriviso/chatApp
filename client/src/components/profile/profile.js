import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import socket from '../../socket/api'
import './profile.css';

export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }
  render () {
    const user = this.props.data.username
    const { isOpen, onClose } = this.props;

    return (
      <div id="modal" className={isOpen ? 'open' : 'closed'}>


        <p>Hello, {user}! Welcome to your profile!</p>

        <button id="close_button" onClick={onClose}>close</button>
      </div>
    );
  }
}
