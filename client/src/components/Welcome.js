import React, { useState } from 'react';

export default function Welcome({ updateTeamName }) {
    const [teamName, setTeamName] = useState('');
    return (
        <form
            onSubmit={(ev) => {
                ev.preventDefault();
                updateTeamName(teamName);
            }}
        >
            <p>Welcome! Enter your team name</p>
            <input
                type="text"
                value={teamName}
                onChange={(ev) => setTeamName(ev.target.value)}
                required
            />
            <button type="submit">Start</button>
        </form>
    );
}
