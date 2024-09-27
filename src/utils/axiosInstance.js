// src/utils/axiosInstance.js
import axios from 'axios';
import { api_url } from '../constants';

// Create Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: `${api_url}`, // Set your base API URL here
});

// Add a request interceptor to include the token in headers
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

// Add a response interceptor to handle invalid token errors
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error status is 401 (Unauthorized) or 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 504)) {
      // If the token is invalid or expired, clear localStorage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      
      // Redirect to login page using window.location to bypass React routing
      window.location.href = '/login';
    }

    // Reject the promise with the error to handle it in your components
    return Promise.reject(error);
  }
);

export default axiosInstance;
