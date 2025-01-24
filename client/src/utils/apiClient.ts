/* import axios from 'axios';

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
      const token = localStorage.getItem('token');
      if (token) {
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

 */

import axios from 'axios';

const api = 'http://localhost:3000/';
export const apiClient = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json', // Default for JSON requests
  },
});

// Add request interceptor to set the Authorization header and dynamically set the Content-Type
apiClient.interceptors.request.use(
  (config) => {
    // Check if there's a file in the data, if so, change Content-Type to 'multipart/form-data'
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    // Add Authorization token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
