import axiosInstance from "./axiosInstance";

export const authUser = async (user) => {
  return axiosInstance({
    method: "post",
    url: "/auth",
    data: {
      email: user.email,
      password: user.password,
    },
  });
};

export const fetchCurrentUser = async () => {
  return axiosInstance({
    method: "get",
    url: "/auth/user",
  });
};

export const deleteCurrentUserAcc = async (id) => {
  return axiosInstance({
    method: "delete",
    url: `/users/${id}`,
  });
};

export const updateCurrentUser = async (id, data) => {
  return axiosInstance({
    method: "patch",
    url: `/users/${id}`,
    data: {
      name: data.name,
      extra_details: data.extra_details,
      skills: data.skills,
      profession: data.profession,
      details: data.details,
    },
  });
};

export const uploadAvatarPhoto = async (id, data) => {
  const formData = new FormData();
  formData.append("avatar", data.file);
  return axiosInstance({
    method: "put",
    url: `/users/upload/${id}`,
    data: formData,
  });
};
