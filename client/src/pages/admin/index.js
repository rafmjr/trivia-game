import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Activities from './activities';
import Teams from './teams';

function Dashboard() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path="/admin/activities" component={Activities} />
            <Route path="/admin/teams" component={Teams} />
            <Route path={match.path}>
                <div>
                    <h1>Dashboard</h1>
                    <ul>
                        <li>
                            <Link to={`${match.url}/activities`}>Activities</Link>
                        </li>
                        <li>
                            <Link to={`${match.url}/teams`}>Teams</Link>
                        </li>
                    </ul>
                    Go back <Link to="/">home</Link>
                </div>
            </Route>
        </Switch>
    );
}

export default Dashboard;
