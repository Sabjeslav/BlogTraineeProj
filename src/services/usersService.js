import axiosInstance from "./axiosInstance";

const defaultParams = {
  limit: 12,
  skip: 0,
};

export const fetchUsers = async (skip) => {
  const params = { ...defaultParams, skip };
  console.log("parameters", params);
  const url = `/users?limit=${params.limit}&skip=${params.skip}`;
  return axiosInstance({
    method: "get",
    url,
  });
};

export const createUser = async (user) => {
  return axiosInstance({
    method: "post",
    url: "/users",
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
    },
  });
};
