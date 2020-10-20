import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState(() => (
    <>
      Edit <code>src/App.js</code> and save to reload.
    </>
  ));

  const response = fetch("http://localhost:3001/users")
    .then((res) => res.text())
    .then(setMessage);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
