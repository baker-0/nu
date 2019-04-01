import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import { Switch, Route } from 'react-router'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
