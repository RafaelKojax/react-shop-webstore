import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/auth-slice';

export const api = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        "Content-type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);
