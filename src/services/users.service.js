import axiosInstance from './axios.instance';
import store from '../store/store';

export const fetchUsers = async () => {
  return await axiosInstance({
    method: 'get',
    url: '/users?limit=0',
  });
};

export const signUp = async user => {
  return await axiosInstance({
    method: 'post',
    url: '/users',
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
    },
  });
};
