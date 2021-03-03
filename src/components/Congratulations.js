import React from 'react';
import logo from '../assets/images/logo.png';
import './Congratulations.scss';

export default function Congratulations({ teamName, totalActivities }) {
    return (
        <div className="Congratulations">
            <div className="logo">
                <span>Simply</span>
                <img src={logo} alt="" />
            </div>
            <div className="circle">
                {totalActivities}/{totalActivities}
            </div>
            <div className="team-name">
                <h2>Congrats!</h2>
                <p>{teamName}</p>
            </div>
        </div>
    );
}
