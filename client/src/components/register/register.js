import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
  }

  submitLogin = e => {
    e.preventDefault()
    const { history } = this.props

    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then((res) => {
      const {authenticatedUser} = res
      if(Object.keys(res).length === 0){
        alert('Sorry, that username has already been taken.')
      } else {
        history.push({
          pathname: `/login`,
          state: { data: authenticatedUser }
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  userNameInput = e => {
    e.preventDefault()
    this.setState({
      userName: e.target.value
    })
  }

  passwordInput = e => {
    e.preventDefault()
    this.setState({
      password: e.target.value
    })
  }


  render() {
    const { userName, password } = this.state

    return (
      <div id="userFormArea">
        <h1>Register Here</h1>
        <form id="userForm" onSubmit={this.submitLogin}>
          <input type="text" value={userName} onChange={this.userNameInput} placeholder="username" />
          <br />
          <input type="text" value={password} onChange={this.passwordInput} placeholder="password" />
          <br />
          <button className="btn" type="submit">
            <span>Sign Up</span>
          </button>
        </form>
        <p>
          <Link to="/login">
            <li>Already a member? Login Here</li>
          </Link>
        </p>
      </div>
    )
  }
}
