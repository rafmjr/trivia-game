import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/admin';
import Index from './pages';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" component={Index} exact />
                    <Route path="/admin" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
