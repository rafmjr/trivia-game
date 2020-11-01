import React from 'react';

export default function Congratulations({ teamName }) {
    return (
        <div className="Welcome">
            <h1>Congratulations!</h1>
            <h3 style={{ fontSize: '2rem' }}>{teamName}</h3>
        </div>
    );
}
