import axios from 'axios';
import { host } from '../config/api';

axios.defaults.baseURL = host;
axios.defaults.withCredentials = true;

export function getActivities() {
    return axios.get('/activities');
}

export function getActivityById(activityId) {
    return axios.get(`/activities/${activityId}`);
}

export function getCurrentActivity() {
    return axios.get('/activities/current');
}

export function createActivity({ question, answers, picture }) {
    return submitFormData('/activities', 'post', { question, answers, picture });
}

export function updateActivity({ _id, question, answers, picture }) {
    return submitFormData(`/activities/${_id}`, 'put', { question, answers, picture });
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

function submitFormData(url, method, data) {
    const form = new FormData();
    Object.entries(data).forEach(([name, datum]) =>
        Array.isArray(datum) ? datum.forEach((value) => form.append(`${name}[]`, value)) : form.append(name, datum)
    );
    return axios({ url, method, data: form, headers: { 'content-type': 'multipart/form-data' } });
}
