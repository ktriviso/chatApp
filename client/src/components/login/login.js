import React, { Component } from 'react'

export default class Login extends Component {
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

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.password
      }),
      json: true
    })
      .then(res => res.json())
      .then((res) => {
        const authenticatedUser = res[1].authenticatedUser
        const messages = res[0]
        console.log(messages)
        console.log('this is the authernticated user')
        console.log(authenticatedUser)
 
        if(authenticatedUser === false){
          history.push({
            pathname: `/`
          })
        } else {
          history.push({
            pathname: `/chat`,
            state: { data: authenticatedUser }
          })
        }
 
      })
      .catch(err => console.log(err))

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
      <h1>Login Here</h1>
        <form id="userForm" onSubmit={this.submitLogin}>
          <input type="text" value={userName} onChange={this.userNameInput} placeholder="username" />
          <br />
          <input type="text" value={password} onChange={this.passwordInput} placeholder="password" />
          <br />
          <button className="btn" type="submit"><span>Sign Up</span></button>
        </form>
      </div>
    )
  }
}
