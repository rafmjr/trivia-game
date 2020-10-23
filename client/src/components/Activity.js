import React from 'react';

export default function Activity({ activity, updateActivity }) {
    return (
        <form
            onSubmit={(ev) => {
                ev.preventDefault();
                updateActivity();
            }}
        >
            <p>{activity.problem}</p>
            <Answer activity={activity} />
            <p>
                <button type="submit">Submit</button>
            </p>
        </form>
    );
}

function Answer({ activity }) {
    if (activity.answers.length === 0) {
        return (
            <div>
                <label htmlFor="textAnswer" style={{ display: 'block' }}>
                    Enter Answer
                </label>
                <input type="text" name="some_name" id="textAnswer" required />
            </div>
        );
    }

    return activity.answers.map((option, index) => (
        <div key={index}>
            <input type="radio" name="some_name" id={index} required />
            <label htmlFor={index}>{option}</label>
        </div>
    ));
}
