import React from 'react';
import { Link } from 'react-router-dom';

function Teams() {
    return (
        <div>
            <h1>Teams</h1>
            Go back <Link to="/admin">dashboard</Link>
        </div>
    );
}

export default Teams;
