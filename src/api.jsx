import axios from 'axios';
export const api = axios.create({
    baseURL: "http://coffee-online-store.infinityfreeapp.com/api/proxy",
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'multipart/form-data',
    // },

});

export default api;
