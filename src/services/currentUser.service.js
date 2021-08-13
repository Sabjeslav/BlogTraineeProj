import axiosInstance from './axiosInstance';

export const authUser = async user => {
  return axiosInstance({
    method: 'post',
    url: '/auth',
    data: {
      email: user.email,
      password: user.password,
    },
  });
};

export const fetchCurrentUser = async () => {
  return axiosInstance({
    method: 'get',
    url: '/auth/user',
  });
};

export const deleteCurrentUserAcc = async id => {
  return axiosInstance({
    method: 'delete',
    url: `/users/${id}`,
  });
};
