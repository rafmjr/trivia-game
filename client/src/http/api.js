import axios from 'axios';
import { host } from '../config/api';

axios.defaults.baseURL = host;

export function getActivities() {
    return axios.get('/activities');
}
