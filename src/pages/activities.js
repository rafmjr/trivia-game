import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivities, createActivity, updateActivity, deleteActivity } from '../http/api';
import ActivityForm from '../components/admin/ActivityForm';

function Activities() {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        if (activities.length) return;
        fetchActivities();
    });

    async function fetchActivities() {
        const { data } = await getActivities();
        setActivities(data.activities || []);
    }

    async function createNewActivity({ question, answers }) {
        await createActivity({ question, answers });
        return fetchActivities();
    }

    async function editActivity({ _id, question, answers }) {
        await updateActivity({ _id, question, answers });
        return fetchActivities();
    }

    async function removeActivity({ _id }) {
        await deleteActivity({ _id });
        return fetchActivities();
    }

    return (
        <div>
            <h1>Activities</h1>
            {activities.map(({ _id, question, answers }) => (
                <Fragment key={_id}>
                    <ActivityForm key={_id} id={_id} question={question} answers={answers} onSubmit={editActivity} />
                    <button onClick={() => removeActivity({ _id })}>Delete</button>
                </Fragment>
            ))}
            <hr />
            <h2>Add New</h2>
            <ActivityForm onSubmit={createNewActivity} visible />
            <hr />
            Go back to <Link to="/admin">dashboard</Link>
        </div>
    );
}

export default Activities;
