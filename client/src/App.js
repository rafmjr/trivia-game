import React, { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import Activity from './components/Activity';
import Congratulations from './components/Congratulations';
import { getCurrentTeam, createTeam, getCurrentActivity } from './http/api';

// TODO: handle HTTP errors
function App() {
    const [teamName, setTeamName] = useState('');
    if (!teamName) {
        getCurrentTeam().then(({ data }) => {
            if (data.team) {
                setTeamName(data.team.name);
            }
        });
    }

    const [currentActivity, setCurrentActivity] = useState(null);
    if (teamName && !currentActivity) {
        // TODO: this is firing 4 api calls when it only should do it once
        updateActivity();
    }

    function updateTeamName(name) {
        createTeam({ name }).then(() => setTeamName(name));
    }

    function updateActivity() {
        getCurrentActivity().then(({ data }) => {
            if (data.activity) {
                setCurrentActivity(data.activity);
            }
        });
    }

    return (
        <div className="App">
            <h1>Trivia</h1>
            {teamName.length === 0 ? (
                <Welcome updateTeamName={updateTeamName} />
            ) : currentActivity ? (
                <>
                    <h3>{teamName}</h3>
                    <Activity activity={currentActivity} updateActivity={updateActivity} />
                </>
            ) : (
                <Congratulations />
            )}
        </div>
    );
}

export default App;
