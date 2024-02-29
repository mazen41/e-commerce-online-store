import axios from 'axios';
export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export default api;