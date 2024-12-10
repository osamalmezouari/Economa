import axios from 'axios';

const api = 'http://localhost:3000/';
export const apiClient = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accesstoken');
      if (token) {
        console.log(token);
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,  
  (error) => {
    return Promise.reject(error);
  }
);

