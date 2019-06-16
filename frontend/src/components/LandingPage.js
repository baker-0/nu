import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  handleSubmit = () => {
    fetch('http://localhost:8888/login') // Get Spotify auth URL.
      .then(res => res.json())
      .then(res => window.location = res.authURL) // Open Spotify auth in a new tab/window.
      .catch(err => console.error("Err: " + err))
  }
  render() {
    return (
      <div id='landing-page'>
        <a id='title' className='animated fadeInDown' href="/"><span id='titleLeft'>Nu</span></a>
        <div id='callToAction'>
          <p id="actionText" className='animated fadeInLeft'>You're <span className='highlight'>one</span> step away from
            <span role='img' aria-label='Fire' id='fire'>
              <span id='fire1' className='animated lightSpeedIn' role='img' aria-label='Fire'>🔥</span>
              <span id='fire2' className='animated lightSpeedIn' role='img' aria-label='Fire'>🔥</span>
              <span id='fire3' className='animated lightSpeedIn' role='img' aria-label='Fire'>🔥</span>
            </span>
          </p>
          <button type='button' id='spotifyButton' className='animated fadeInRight' onClick={this.handleSubmit}>
            Connect to Spotify
          <img src="./spotify.png" id="spotifyLogo" alt="spotify logo"></img>
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
