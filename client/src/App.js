import React, { useState } from "react";
import "./App.css";
import Welcome from "./Welcome";
import Activity from "./Activity";
import Congratulations from "./Congratulations";
import { getQuestions } from "./api";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [teamName, setTeamName] = useState("");

  if (!questions.length) {
    getQuestions().then(setQuestions);
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="App">
      <h1>Trivia</h1>
      {teamName.length === 0 ? (
        <Welcome updateTeamName={setTeamName} />
      ) : currentQuestion ? (
        <>
          [[{teamName}]]
          <Activity
            question={currentQuestion}
            updateQuestion={() => setCurrentIndex(currentIndex + 1)}
          />
        </>
      ) : (
        <Congratulations />
      )}
    </div>
  );
}

export default App;
