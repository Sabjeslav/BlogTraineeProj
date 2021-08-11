import axiosInstance from './axios.instance';
import store from '../store/store';

export const authUser = async user => {
  return await axiosInstance({
    method: 'post',
    url: '/auth',
    data: {
      email: user.email,
      password: user.password,
    },
  });
};

export const login = async () => {
  return await axiosInstance({
    method: 'get',
    url: '/auth/user',
  });
};
