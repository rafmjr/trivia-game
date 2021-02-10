import React, { useEffect, useState } from 'react';

import './styles/main.scss';
import Welcome from './components/Welcome';
import Activity from './components/Activity';
import Congratulations from './components/Congratulations';
import { getCurrentTeam, createTeam, getCurrentActivity, createResult } from './http/api';

function Trivia() {
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
    const [pagination, setPagination] = useState(JSON.parse(window.localStorage.getItem('pagination')) || {});
    const [totalActivities, setTotalActivities] = useState(0);
    useEffect(() => {
        if (!teamName || currentActivity) return;
        updateActivity();
    }, [teamName, currentActivity]);

    useEffect(() => {
        if (!pagination) return;
        setTotalActivities(pagination.total);
    }, [pagination]);

    // store the state in localStorage
    useEffect(() => {
        window.localStorage.setItem('teamName', teamName);
        window.localStorage.setItem('pagination', JSON.stringify(pagination));
        window.localStorage.setItem('currentActivity', JSON.stringify(currentActivity));
    }, [teamName, currentActivity, pagination]);

    function updateTeamName(name) {
        createTeam({ name }).then(({ data }) => setTeamName(data.team.name));
    }

    function setResult(solution) {
        createResult({ activityId: currentActivity._id, solution }).then(updateActivity);
    }

    function updateActivity() {
        getCurrentActivity().then(({ data }) => {
            setPagination(data.pagination);
            setCurrentActivity(data.activity);
        });
    }

    return (
        <div className="Trivia">
            {teamName ? (
                currentActivity ? (
                    <Activity
                        teamName={teamName}
                        activity={currentActivity}
                        pagination={pagination}
                        setResult={setResult}
                    />
                ) : (
                    <Congratulations teamName={teamName} totalActivities={totalActivities} />
                )
            ) : (
                <Welcome updateTeamName={updateTeamName} />
            )}
        </div>
    );
}

export default Trivia;
