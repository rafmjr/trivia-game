import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivities } from '../../http/api';

function Activities() {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        if (!activities.length) {
            getActivities().then(({ data }) => data.activities && setActivities(data.activities));
        }
    });

    return (
        <div>
            <h1>Activities</h1>
            {activities.map(({ _id, question, answers }) => (
                <Form question={question} answers={answers} key={_id} />
            ))}
            Go back to <Link to="/admin">dashboard</Link>
        </div>
    );
}

function Form({ question, answers }) {
    const [isOpenQuestion, setIsOpenQuestion] = useState(!answers.length);
    const [options, setOptions] = useState(answers);

    function handleSubmit(ev) {
        ev.preventDefault();
    }

    // TODO: options are not working
    return (
        <form onSubmit={handleSubmit}>
            <h3>{question}</h3>
            <div>
                <input type="checkbox" id="is-open-question" checked={isOpenQuestion} onChange={setIsOpenQuestion} />
                <label htmlFor="is-open-question">clear options</label>
            </div>
            {options.map((option, idx) => (
                <div key={idx}>
                    <input
                        type="text"
                        value={option}
                        onChange={(ev) => {
                            options[idx] = ev.target.value;
                            setOptions(options);
                        }}
                        id={idx}
                    />
                </div>
            ))}
            <button type="submit">Save</button>
        </form>
    );
}

export default Activities;
