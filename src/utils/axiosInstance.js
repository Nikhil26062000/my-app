// src/utils/axiosInstance.js
import axios from 'axios';
import { api_url } from '../constants';

const axiosInstance = axios.create({
  baseURL: `${api_url}`, // Set your base API URL here
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers['Token'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
