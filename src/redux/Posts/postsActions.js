import {
  disablePostsIsFetching,
  enablePostsIsFetching,
  getAllPostsMutation,
  setPageMutation,
  setPostErrorMutation,
} from "./postsMutations";
import { createPost, fetchPosts } from "../../services/postsService";
import { toggleSnackbar } from "../Snackbar/snackbarActions";

export const getAllPosts = (postedBy) => {
  const params = {
    postedBy,
  };
  return (dispatch) => {
    dispatch(enablePostsIsFetching());
    fetchPosts(params)
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

export const addNewPost = (data, history) => {
  return (dispatch) => {
    createPost(data)
      .then(() => {
        dispatch(toggleSnackbar("Post added successfully"));
        dispatch(getAllPosts());
        history.push("/posts");
      })
      .catch((e) => {
        dispatch(setPostError(e));
        console.error(e);
      });
  };
};

export const setPage = (page) => {
  return (dispatch) => {
    dispatch(setPageMutation(page));
  };
};

export const setPostError = (error) => {
  return (dispatch) => {
    dispatch(setPostErrorMutation(error));
  };
};
