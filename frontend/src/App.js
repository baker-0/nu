import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import { Switch, Route, Redirect } from 'react-router'
import Loading from './components/Loading';

const initialRedirect = () => {
  if (localStorage.getItem('spotify-auth')) { // User already authenticated.
    return <Redirect to="/dashboard" />
  }
  else { // New user.
    return (<Redirect to="/login" />)
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    // Bind handler function to 'this' such that it can be called from child components.
    this.authHandler = this.authHandler.bind(this)
  }

  authHandler(token) {
    this.setState({
      'auth_token': token
    })
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('nextState :', nextState);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={initialRedirect} />
          <Route exact path='/login' component={LandingPage} />
          <Route exact path='/authorized'
            render={(props) => <Loading {...props} authHandler={this.authHandler} />} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
