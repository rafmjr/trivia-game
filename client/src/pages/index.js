import React, { useEffect, useState } from 'react';
import './index.css';
import Welcome from '../components/Welcome';
import Activity from '../components/Activity';
import Congratulations from '../components/Congratulations';
import { getCurrentTeam, createTeam, getCurrentActivity, createResult } from '../http/api';

// TODO: handle HTTP errors
function Index() {
    // use team name state and set default values
    const [teamName, setTeamName] = useState(window.localStorage.getItem('teamName') || '');
    useEffect(() => {
        if (teamName) return;
        getCurrentTeam()
            .then(({ data }) => data.team && setTeamName(data.team.name))
            .catch(() => console.log('No current team yet'));
    });

    // use activity state and set default values
    const [currentActivity, setCurrentActivity] = useState(JSON.parse(window.localStorage.getItem('currentActivity')));
    useEffect(() => {
        if (!teamName || currentActivity) return;
        updateActivity();
    });

    // store the state in localStorage
    useEffect(() => {
        window.localStorage.setItem('teamName', teamName);
        window.localStorage.setItem('currentActivity', JSON.stringify(currentActivity));
    }, [teamName, currentActivity]);

    function updateTeamName(name) {
        createTeam({ name }).then(({ data }) => setTeamName(data.team.name));
    }

    function setResult(solution) {
        createResult({ activityId: currentActivity._id, solution }).then(updateActivity);
    }

    function updateActivity() {
        getCurrentActivity().then(({ data }) => setCurrentActivity(data.activity));
    }

    return (
        <div className="Index">
            {!teamName && <Welcome updateTeamName={updateTeamName} />}
            {teamName && currentActivity && (
                <>
                    <h3 style={{ textAlign: 'left', marginLeft: '5%' }}>{teamName}</h3>
                    <Activity activity={currentActivity} setResult={setResult} />
                </>
            )}
            {teamName && !currentActivity && <Congratulations teamName={teamName} />}
        </div>
    );
}

export default Index;
