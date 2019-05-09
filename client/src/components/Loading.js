import React, { Component } from 'react';
import './Loading.css';
import Spinner from './Spinner';
const queryString = require('query-string');

class Loading extends Component {

  constructor(props) {
    super(props)
    let response = queryString.parse(props.location.search);
    console.log('response :', response);
    props.authHandler(response.code);
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
