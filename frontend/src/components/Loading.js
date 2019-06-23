import React, { Component } from 'react';
import './Loading.css';
import Spinner from './Spinner';
const queryString = require('query-string');
const apiUrl= process.env.REACT_APP_API_URL;
const webUrl = process.env.REACT_APP_WEB_URL

class Loading extends Component {
  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    if (query.token) { // check if JWT being passed in url
      localStorage.setItem('spotify-auth', query.token);
    }

    fetch(`${apiUrl}/user/top/tracks`, {
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('spotify-auth')}`
      })
    })
      .then(res => {
        if (res.status === 401)
          window.location.replace(webUrl + "/login")
        return res.json()
      })
      .then(res => console.log("TOP TRACKS:", res))
  }
  render() {
    return (
      <div id='landing-page'>
        <a className='animated bounceInLeft' href='/'><span id='title'>Nu</span></a>
        <Spinner></Spinner>
        <div id='callToAction'>
          <div>
            <p>Connecting to Spotify</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
