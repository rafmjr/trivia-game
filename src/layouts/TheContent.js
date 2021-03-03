import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';
import { auth } from '../http/api';

// routes config
import routes from '../routes';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

const TheContent = () => {
    useEffect(() => {
        auth().then(({ data }) => {
            console.log(data);
            if (!data.auth) {
                window.location.href = '/login';
            }
        });
    });

    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return (
                                route.component && (
                                    <Route
                                        key={idx}
                                        path={`/dashboard/${route.path}`}
                                        exact={route.exact}
                                        name={route.name}
                                        render={(props) => (
                                            <CFade>
                                                <route.component {...props} />
                                            </CFade>
                                        )}
                                    />
                                )
                            );
                        })}
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </Suspense>
            </CContainer>
        </main>
    );
};

export default React.memo(TheContent);
