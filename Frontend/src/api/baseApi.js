import axios from 'axios';
import { BACKEND_URL } from '../constants';
const baseApi = axios.create({
    baseURL: BACKEND_URL,
})
baseApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token; // Attach the token as Bearer token
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default baseApi