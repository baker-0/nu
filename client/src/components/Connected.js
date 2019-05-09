import React, { Component } from 'react';
import './LandingPage.css';
import Spinner from './Spinner';
const queryString = require('query-string');

class Connected extends Component {

  constructor(props) {
    super(props)
    let response = queryString.parse(props.location.search);
    console.log('response :', response);
    props.authHandler(response.code);
  }
  render() {
    return (
      <div id='landing-page'>
        <a href='/'><span id='title'>Nu</span></a>
        <Spinner></Spinner>
        <div id='callToAction'>
          <div>
            <p>Connecting to Spotify</p>
          <img src="./spotify.png" id="spotifyLogo" alt="Spotify"></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Connected;
