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
                        <p id='title' className='animated bounceInDown'>Nu</p>
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
