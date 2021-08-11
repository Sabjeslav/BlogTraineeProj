import axiosInstance from './axios.instance';
import store from '../store/store';

export const fetchUsers = async () => {
  return await axiosInstance({
    method: 'get',
    url: '/users?limit=0',
  });
};
