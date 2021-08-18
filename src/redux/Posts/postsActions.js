import {
  addNewPostMutation,
  disablePostsIsFetching,
  enablePostsIsFetching,
  getAllPostsMutation,
  setPostErrorMutation,
} from "./postsMutations";
import { createPost, fetchPosts } from "../../services/postsService";

export const getAllPosts = () => {
  return (dispatch) => {
    dispatch(enablePostsIsFetching());
    fetchPosts()
      .then((res) => {
        dispatch(setPostError(null));
        dispatch(getAllPostsMutation(res));
        dispatch(disablePostsIsFetching());
      })
      .catch((e) => {
        dispatch(setPostError(e));
        console.error(e);
      });
  };
};

export const addNewPost = (data) => {
  return (dispatch) => {
    createPost(data)
      .then(() => {
        dispatch(addNewPostMutation(data));
      })
      .catch((e) => {
        dispatch(setPostError(e));
        console.error(e);
      });
  };
};

export const setPostError = (error) => {
  return (dispatch) => {
    dispatch(setPostErrorMutation(error));
  };
};
