import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    handleSubmit = () => {

    }
    render() {
        return (
            <div class="track">
                <img class="coverArt" src="./coverArt.jpg"></img>
                <div class="wrapper-scroll">
                    <p class="trackTitle">Celebrate Life</p>
                </div>
                <div class="wrapper-scroll">
                    <p class="trackArtist">Charlie Heat, DRAM, Ant Beale</p>
                </div>
            </div>
        );
    }
}

export default Track;
