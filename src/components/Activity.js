import React, { useState } from 'react';

export default function Activity({ activity, setResult }) {
    const [answer, setAnswer] = useState('');

    const handleChange = (ev) => setAnswer(ev.target.value);

    const option = activity.answers.length ? (
        activity.answers.map((option, index) => (
            <div key={index} style={{ marginTop: '1rem' }}>
                <input
                    type="radio"
                    value={option}
                    checked={answer === option}
                    onChange={handleChange}
                    id={index}
                    required
                    style={{ marginRight: '1rem' }}
                />
                <label htmlFor={index}>{option}</label>
            </div>
        ))
    ) : (
        <div>
            <label htmlFor="textAnswer" style={{ display: 'block' }}>
                Enter Answer
            </label>
            <input type="text" value={answer} onChange={handleChange} id="textAnswer" required />
        </div>
    );

    return (
        <form
            onSubmit={(ev) => {
                ev.preventDefault();
                // notify the app of the result
                setResult(answer);
                // reset the answer for next activy
                setAnswer('');
            }}
            className="Welcome"
        >
            <h2>{activity.question}</h2>
            {option}
            <div className="button-wrapper">
                <button type="submit">
                    <span>Submit</span>
                </button>
            </div>
        </form>
    );
}
