import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import { Switch, Route, Redirect } from 'react-router'

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
          <Route exact path="/" render={() => (
            this.state.isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
                <Redirect to="/login" />
              )
          )} />

        </Switch>
      </div>
    );
  }
}

export default App;
