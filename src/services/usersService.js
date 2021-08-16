import axiosInstance from "./axiosInstance";

export const fetchUsers = async () => {
  return axiosInstance({
    method: "get",
    url: "/users?limit=0",
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
