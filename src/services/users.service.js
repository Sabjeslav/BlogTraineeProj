import axiosInstance from './axios.instance';

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
