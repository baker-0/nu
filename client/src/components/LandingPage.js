import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  handleSubmit = () => {

  }
  render() {
    return (
      <div id='landing-page'>
        <p id='title' className='animated fadeInDown'><span id='titleLeft'>N</span>u</p>
        <div id='callToAction'>
          <p className='animated fadeInLeftBig'>You're <span className='highlight'>one</span> step away from
            <span role='img' aria-label='Fire' id='fire'>
              <span id='fire1' className='animated lightSpeedIn'>🔥</span>
              <span id='fire2' className='animated lightSpeedIn'>🔥</span>
              <span id='fire3' className='animated lightSpeedIn'>🔥</span>
            </span>
          </p>
          <button id='spotifyButton' className='animated fadeInRightBig' type='button'>
            Connect to Spotify
          <img src="./spotify.png" id="spotifyLogo"></img>
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
