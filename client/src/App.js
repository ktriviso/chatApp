import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Login from './components/login/login'
import Profile from './components/profile/profile'
import Chat from './components/chat/chat'
import Register from './components/register/register'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/' component={Register} />
        </Switch>
      </div>
    )
  }
}

export default App;
