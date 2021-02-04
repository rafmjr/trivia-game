import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import './Welcome.scss';

export default function Welcome({ updateTeamName }) {
    const [teamName, setTeamName] = useState('');
    return (
        <form
            onSubmit={(ev) => {
                ev.preventDefault();
                updateTeamName(teamName);
            }}
            className="Welcome"
        >
            <div className="title">
                <h1>Simply</h1>
                <img src={logo} alt="" />
            </div>

            <div className="input-group">
                <input
                    type="text"
                    value={teamName}
                    onChange={(ev) => setTeamName(ev.target.value)}
                    placeholder="What's your team name?"
                    required
                />
                <button type="submit">Let's Get Started!</button>
            </div>
        </form>
    );
}
