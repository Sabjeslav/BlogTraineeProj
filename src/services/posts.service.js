import axiosInstance from './axios.instance';
import store from '../store/store';

export const fetchPosts = async () => {
  return await axiosInstance({
    method: 'GET',
    url: '/posts?limit=0',
  });
};

export const createPost = async newPost => {
  return await axiosInstance({
    method: 'post',
    url: '/posts',
    data: {
      title: newPost.title,
      fullText: newPost.fullText,
      description: newPost.description,
    },
  });
};

export const getPostById = async id => {
  return await axiosInstance({
    method: 'get',
    url: `/posts/${id}`,
  });
};

export const deletePostById = async id => {
  return await axiosInstance({
    method: 'delete',
    url: `/posts/${id}`,
  });
};

export const likePost = async id => {
  return await axiosInstance({
    method: 'put',
    url: `/posts/like/${id}`,
  });
};