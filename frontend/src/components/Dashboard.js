import React, { Component } from 'react';
import './Dashboard.css';
import Track from './Track'

class Dashboard extends Component {
    handleSubmit = () => {

    }
    render() {
        return (
            <div id='dashboard'>
                <div id="header">
                    <div id="header-content">
                        <a href='/'><span id='title' className='animated bounceInDown'>Nu</span></a>
                    </div>
                </div>
                <div id='content'>
                    <p>Your Top Tracks</p>
                    <div id="topTracks">
                        <Track></Track>
                        <Track></Track>
                        <Track></Track>
                    </div>
                    <button>Generate recommendations</button>
                </div>
            </div>
        );
    }
}

export default Dashboard;
