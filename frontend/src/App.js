import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import { Switch, Route, Redirect } from 'react-router'
import Loading from './components/Loading';

const initialRedirect = () => {
  let spJWT = localStorage.getItem('spotify-auth')
  if (spJWT !== 'undefined' && spJWT !== null) { // User already authenticated.
    return <Redirect to="/authorized" />
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
          <Route exact path='/authorized' component={Loading} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
