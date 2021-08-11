import axiosInstance from './axios.instance';
import store from '../store/store';

export const fetchPosts = async () => {
  return await axiosInstance({
    method: 'GET',
    url: '/posts?limit=0',
  });
};
