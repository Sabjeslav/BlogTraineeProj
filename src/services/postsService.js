import axiosInstance from "./axiosInstance";

export const fetchPosts = async (postedBy) => {
  let url = `/posts?&limit=0`;
  if (postedBy) url = `/posts?postedBy=${postedBy}&limit=0`;
  return axiosInstance({
    method: "GET",
    url,
  });
};

export const createPost = async (newPost) => {
  return axiosInstance({
    method: "post",
    url: "/posts",
    data: {
      title: newPost.title,
      fullText: newPost.fullText,
      description: newPost.description,
    },
  });
};

export const editPost = async (id, newPost) => {
  return axiosInstance({
    method: "patch",
    url: `/posts/${id}`,
    data: {
      title: newPost.title,
      fullText: newPost.fullText,
      description: newPost.description,
    },
  });
};

export const getPostById = async (id) => {
  return axiosInstance({
    method: "get",
    url: `/posts/${id}`,
  });
};

export const getPostsByUsedId = async (id) => {
  return axiosInstance({
    method: "get",
    url: `/posts?postedBy=${id}`,
  });
};

export const deletePostById = async (id) => {
  return axiosInstance({
    method: "delete",
    url: `/posts/${id}`,
  });
};

export const likePostById = async (id) => {
  return axiosInstance({
    method: "put",
    url: `/posts/like/${id}`,
  });
};

export const getPostComments = async (id) => {
  return axiosInstance({
    method: "get",
    url: `/comments/post/${id}`,
  });
};

export const deletePostComment = async (id) => {
  return axiosInstance({
    method: "delete",
    url: `/comments/${id}`,
  });
};

export const likePostComment = async (id) => {
  return axiosInstance({
    method: "put",
    url: `/comments/like/${id}`,
  });
};

export const addPostComment = async (id, text) => {
  return axiosInstance({
    method: "post",
    url: `/comments/post/${id}`,
    data: {
      text,
      followedCommentID: null,
    },
  });
};

export const editPostComment = async (id, text) => {
  return axiosInstance({
    method: "patch",
    url: `/comments/${id}`,
    data: {
      text,
    },
  });
};
