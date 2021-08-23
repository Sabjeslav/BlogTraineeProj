import axios from "axios";
import { API_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.token)
      config.headers["Authorization"] = `Bearer ${localStorage.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.response.data.error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("error", error);
    return Promise.reject(error.response.data.error);
  }
);

export default axiosInstance;
