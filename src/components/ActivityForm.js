import React, { useState } from 'react';

export default function ActivityForm({ id, question = '', answers = [], visible = false, onSubmit }) {
    const [isOpenQuestion, setIsOpenQuestion] = useState(visible ? false : !answers.length);
    const [questionState, setQuestionState] = useState(question);
    const [answersState, setAnswersState] = useState(answers);
    const [isVisible, setIsVisible] = useState(visible);

    function OptionInput({ option, index }) {
        return (
            <div>
                <input
                    type="text"
                    defaultValue={option}
                    onBlur={(e) => {
                        const newAnswers = answersState.slice();
                        newAnswers[index] = e.target.value;
                        setAnswersState(newAnswers.filter(Boolean));
                    }}
                />
                <button
                    onClick={() => {
                        const newAnswers = answersState.slice();
                        delete newAnswers[index];
                        setAnswersState(newAnswers);
                    }}
                >
                    X
                </button>
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({ _id: id, question: questionState, answers: answersState });
        setIsVisible(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {!isVisible && (
                <h3 onClick={() => setIsVisible(!isVisible)} style={{ cursor: 'pointer' }}>
                    {questionState}
                </h3>
            )}
            {isVisible && (
                <div>
                    <div>
                        <input
                            type="text"
                            value={questionState}
                            onChange={(e) => setQuestionState(e.target.value)}
                            placeholder="Enter question..."
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="is-open-question"
                            checked={isOpenQuestion}
                            onChange={(e) => setIsOpenQuestion(e.target.checked)}
                        />
                        <label htmlFor="is-open-question">clear options</label>
                    </div>
                    {!isOpenQuestion &&
                        answersState.map((option, index) => <OptionInput option={option} index={index} key={index} />)}
                    {!isOpenQuestion && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter answer..."
                                onBlur={(e) => {
                                    const newAnswers = answersState.slice();
                                    newAnswers.push(e.target.value);
                                    e.target.value = '';
                                    setAnswersState(newAnswers.filter(Boolean));
                                }}
                            />
                        </div>
                    )}
                    <button type="submit">Save</button>
                </div>
            )}
        </form>
    );
}
