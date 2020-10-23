import React, { useState } from 'react';
import './App.css';
import Welcome from './components/Welcome';
import Activity from './components/Activity';
import Congratulations from './components/Congratulations';
import { getActivities } from './http/api';

function App() {
    const [activities, setActivities] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [teamName, setTeamName] = useState('');

    if (!activities.length) {
        // TODO: handle errors
        // TODO: this is firing 4 api calls when it only should do it once
        getActivities().then(({ data }) => setActivities(data));
    }

    const currentActivity = activities[currentIndex];

    return (
        <div className="App">
            <h1>Trivia</h1>
            {teamName.length === 0 ? (
                <Welcome updateTeamName={setTeamName} />
            ) : currentActivity ? (
                <>
                    [[{teamName}]]
                    <Activity
                        activity={currentActivity}
                        updateActivity={() => setCurrentIndex(currentIndex + 1)}
                    />
                </>
            ) : (
                <Congratulations />
            )}
        </div>
    );
}

export default App;
