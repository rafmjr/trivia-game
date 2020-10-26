import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
    return (
        <div>
            <h1>Admin</h1>
            Go back <Link to="/">home</Link>
        </div>
    );
}

export default Admin;
