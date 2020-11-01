import React, { useState } from 'react';

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
            <h1>Enter name to Get Started</h1>
            <input type="text" value={teamName} onChange={(ev) => setTeamName(ev.target.value)} required />
            <div className="button-wrapper">
                <button type="submit">
                    <span>Start</span>
                </button>
            </div>
        </form>
    );
}
