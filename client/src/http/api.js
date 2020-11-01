import axios from 'axios';
import { host } from '../config/api';

axios.defaults.baseURL = host;
axios.defaults.withCredentials = true;

export function getActivities() {
    return axios.get('/activities');
}

export function getCurrentActivity() {
    return axios.get('/activities/current');
}

export function createActivity({ question, answers }) {
    return axios.post('/activities', { question, answers });
}

export function updateActivity({ _id, question, answers }) {
    return axios.put(`/activities/${_id}`, { question, answers });
}

export function deleteActivity({ _id }) {
    return axios.delete(`/activities/${_id}`);
}

export function getTeams() {
    return axios.get('/teams');
}

export function getCurrentTeam() {
    return axios.get('/teams/current');
}

export function createTeam({ name }) {
    return axios.post('/teams', { name });
}

export function createResult({ activityId, solution }) {
    return axios.post('/results', { activityId, solution });
}
