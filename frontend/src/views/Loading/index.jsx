import React, { Component } from 'react';
import './Loading.css';
import './LandingPage.css';
import { Spinner } from 'components/Spinner';
import queryString from 'query-string'
const apiUrl= process.env.REACT_APP_API_URL;
const webUrl = process.env.REACT_APP_WEB_URL

class Loading extends Component {
  componentDidMount() {
    window.addEventListener('storage', this.localStorageUpdated);
    let query = queryString.parse(this.props.location.search);
    // check if JWT being passed in url
    if (!query.token) { return }
    localStorage.setItem('spotify-auth', query.token);
    localStorage.setItem('isAuthenticated', true);
    window.close();
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.localStorageUpdated);
  }

  localStorageUpdated() {
    if (localStorage.getItem('isAuthenticated') === 'true')
      window.location.replace('/dashboard')
  }

  render() {
    return (
      <div id="landing-page">
        <img
          alt="Nu logo"
          className="animated bounceInLeft"
          id="logo"
          src="/images/logos/nu_logo.svg"
        />
        <Spinner />
      </div>
    );
  }
}

export default Loading;
