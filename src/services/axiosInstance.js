import axios from 'axios';
import { API_URL } from '../constants';

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    if (localStorage.token)
      config.headers['Authorization'] = `Bearer ${localStorage.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
