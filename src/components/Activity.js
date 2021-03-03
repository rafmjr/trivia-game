import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/images/logo.png';
import './Activity.scss';

const TIME_LIMIT = 90;

export default function Activity({ teamName, activity, setResult, pagination }) {
    const [answer, setAnswer] = useState('');
    const [seconds, setSeconds] = useState(Number(window.localStorage.getItem('seconds')) || 0);
    const submitBtn = useRef(null);

    useEffect(() => {
        // let's get the counter going
        const timer = setTimeout(() => setSeconds((seconds) => seconds + 1), 1000);
        // persists the spent time between page reloads
        window.localStorage.setItem('seconds', seconds);
        // stop the counter once the limit was reached
        if (seconds >= TIME_LIMIT) {
            submitBtn.current.click();
            clearTimeout(timer);
        }
        return () => clearTimeout(timer);
    }, [seconds]);

    function handleChange(ev) {
        setAnswer(ev.target.value);
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        // notify the app of the result
        setResult(answer);
        // reset the answer for next activy
        setAnswer('');
        // reset the counter
        setSeconds(0);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, 0)}:${String(secs).padStart(2, 0)}`;
    }

    function calculateCounterStyle() {
        return {
            width: `calc(${Math.floor((seconds / TIME_LIMIT) * 100)}% - 0.7em)`,
        };
    }

    return (
        <form onSubmit={handleSubmit} className="Activity">
            <header className="header">
                <div className="logo">
                    <span>Simply</span>
                    <img src={logo} alt="" />
                </div>
                <p>
                    Question {pagination.current} of {pagination.total}
                </p>
                <p>
                    <span>Team </span>
                    <strong>{teamName}</strong>
                </p>
            </header>
            <main>
                <div className="question-column">
                    <section className="question">
                        <span>{pagination.current}</span>
                        <h2>{activity.question}</h2>
                    </section>
                    <section className="options">
                        {activity.picture && (
                            <figure>
                                <img src={`${process.env.REACT_APP_API_HOST}/${activity.picture}`} alt="" />
                            </figure>
                        )}
                        <article>
                            <Options options={activity.answers} value={answer} onChange={handleChange} />
                        </article>
                    </section>
                </div>
                <div className="arrow-column" onClick={() => submitBtn.current.click()}>
                    <div className="icon">
                        <div className="arrow">
                            <button type="submit" ref={submitBtn}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <div className="counter">
                <span style={calculateCounterStyle()}>{formatTime(TIME_LIMIT - seconds)}</span>
            </div>
        </form>
    );
}

function Options({ options, value, onChange }) {
    return options.length ? (
        options.map((option, index) => (
            <div key={index}>
                <input type="radio" value={option} checked={value === option} onChange={onChange} id={index} />
                <label htmlFor={index}>{option}</label>
            </div>
        ))
    ) : (
        <div>
            <input type="text" value={value} onChange={onChange} placeholder="Enter Answer" />
        </div>
    );
}
