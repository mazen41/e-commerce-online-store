import axios from 'axios';
export const api = axios.create({
    baseURL: "http://coffee-online-store.infinityfreeapp.com/",
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    rejectUnauthorized: false // Set to false to allow insecure requests

});

export default api;