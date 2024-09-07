import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

const api = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);


export default api;
