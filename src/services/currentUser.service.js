import axiosInstance from './axios.instance';

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

export const fetchCurrentUser = async () => {
  return await axiosInstance({
    method: 'get',
    url: '/auth/user',
  });
};

export const deleteCurrentUserAcc = async id => {
  return await axiosInstance({
    method: 'delete',
    url: `/users/${id}`,
  });
};
