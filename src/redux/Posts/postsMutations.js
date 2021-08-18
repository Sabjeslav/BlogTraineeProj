import {
  ADD_NEW_POST,
  DISABLE_POSTS_IS_FETCHING,
  ENABLE_POSTS_IS_FETCHING,
  GET_ALL_POSTS,
  SET_POST_ERROR,
  TOGGLE_SNACKBAR,
} from "./postsTypes";

export const getAllPostsMutation = (data) => {
  return {
    type: GET_ALL_POSTS,
    data,
  };
};

export const enablePostsIsFetching = () => {
  return {
    type: ENABLE_POSTS_IS_FETCHING,
  };
};

export const disablePostsIsFetching = () => {
  return {
    type: DISABLE_POSTS_IS_FETCHING,
  };
};

export const addNewPostMutation = (data) => {
  return {
    type: ADD_NEW_POST,
    data,
  };
};

export const setPostErrorMutation = (error) => {
  return {
    type: SET_POST_ERROR,
    error,
  };
};

export const toggleSnackbarMutation = () => {
  return {
    type: TOGGLE_SNACKBAR,
  };
};
