import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Admin from './Admin';
import Trivia from './Trivia';

function App() {
    return (
        <Router>
            <div className="App">
                <Route path="/" component={Trivia} exact />
                <Route path="/admin" component={Admin} exact />
            </div>
        </Router>
    );
}

export default App;
