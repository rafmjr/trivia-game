import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

const Trivia = React.lazy(() => import('./Trivia'));
const Admin = React.lazy(() => import('./Admin'));
const Login = React.lazy(() => import('./pages/Login'));

// TODO: implement global spinner
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

ReactDOM.render(
    <React.Suspense fallback={loading}>
        <Router>
            <Switch>
                <Route path="/" component={Trivia} exact />
                <Route path="/dashboard" component={Admin} />
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    </React.Suspense>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
