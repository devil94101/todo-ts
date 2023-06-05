import axios from 'axios';
const BASE_URL = 'https://todo-backend-ltb3ddfvx-devil94101.vercel.app';
// const BASE_URL = "https://todo-backend-ts.vercel.app/"
export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});