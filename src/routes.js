import React from 'react';

const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const Activity = React.lazy(() => import('./pages/Activity'));

const routes = [
    { path: '', name: 'Dashboard', component: Dashboard, exact: true },
    { path: 'activities/create', name: 'Create Activity', component: Activity, exact: true },
    { path: 'activities/:_id', name: 'Edit Activity', component: Activity },
];

export default routes;
