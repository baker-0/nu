import React, { Component } from 'react';
import './Loading.css';
import Spinner from './Spinner';
const queryString = require('query-string');
const HOST = process.env.REACT_APP_API_URL;

class Loading extends Component {
  componentDidMount() {
    let query = queryString.parse(this.props.location.search);
    if (query.token) { // check if JWT being passed in url
      localStorage.setItem('spotify-auth', query.token);
    }

    fetch(`${HOST}/user/top/tracks`, {
      headers: new Headers({
        'Authorization': `Bearer ${localStorage.getItem('spotify-auth')}`
      })
    })
      .then(res => res.json())
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
