import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { createTeam } from '../http/api';
import './Welcome.scss';

export default function Welcome({ updateTeamName }) {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(ev) {
        ev.preventDefault();
        try {
            await createTeam({ name });
            setError(null);
            updateTeamName(name);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="Welcome">
            <div className="title">
                <h1>Simply</h1>
                <img src={logo} alt="" />
            </div>

            <div className={`input-group ${error ? 'error' : ''}`}>
                <input
                    type="text"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder="What's your team name?"
                    required
                />
                {error && <span className="error-message">This team name is already taken</span>}
                <button type="submit">Let's Get Started!</button>
            </div>
        </form>
    );
}
