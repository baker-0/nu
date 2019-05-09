import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import { Switch, Route, Redirect } from 'react-router'

const initialRedirect = () => {
  if (localStorage.getItem('spotify-auth')) { // User already authenticated.
    return <Redirect to="/dashboard" />
  }
  else { // New user.
    return (<Redirect to="/login" />)
  }
}

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={initialRedirect} />
          <Route exact path='/login' component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
