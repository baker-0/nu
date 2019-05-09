import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  handleSubmit = () => {
    fetch('https://localhost:8888/login', {
      mode: 'cors'
    })
      .then(res => console.log('res ', res))
      .catch(err => console.error("Err: " + err))

  }
  render() {
    return (
      <div id='landing-page'>
        <p id='title' className='animated fadeInDown'><span id='titleLeft'>N</span>u</p>
        <div id='callToAction'>
          <p id="actionText" className='animated fadeInLeft'>You're <span className='highlight'>one</span> step away from
            <span role='img' aria-label='Fire' id='fire'>
              <span id='fire1' className='animated lightSpeedIn' role='img'>🔥</span>
              <span id='fire2' className='animated lightSpeedIn' role='img'>🔥</span>
              <span id='fire3' className='animated lightSpeedIn' role='img'>🔥</span>
            </span>
          </p>
          <button type='button' id='spotifyButton' className='animated fadeInRight' onClick={this.handleSubmit}>
            Connect to Spotify
          <img src="./spotify.png" id="spotifyLogo"></img>
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
