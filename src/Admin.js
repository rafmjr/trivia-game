import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/admin.scss';
import store from './store';
import { icons } from './assets/icons';

React.icons = icons;

// Containers
const TheLayout = React.lazy(() => import('./layouts/TheLayout'));

function Admin() {
    return (
        <Provider store={store}>
            <React.StrictMode>
                <Switch>
                    <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
                </Switch>
            </React.StrictMode>
        </Provider>
    );
}

export default Admin;
