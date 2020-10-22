import React from "react";

export default function Activity({ question, updateQuestion }) {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        updateQuestion();
      }}
    >
      <p>{question.problem}</p>
      <Answer question={question} />
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

function Answer({ question }) {
  if (question.options.length === 0) {
    return (
      <div>
        <label htmlFor="textAnswer" style={{ display: "block" }}>
          Enter Answer
        </label>
        <input type="text" name="some_name" id="textAnswer" required />
      </div>
    );
  }

  return question.options.map((option, index) => (
    <div key={index}>
      <input type="radio" name="some_name" id={index} required />
      <label htmlFor={index}>{option}</label>
    </div>
  ));
}
