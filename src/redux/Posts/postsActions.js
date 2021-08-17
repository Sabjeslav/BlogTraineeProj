import {
  addNewPostMutation,
  disablePostsIsFetching,
  enablePostsIsFetching,
  getAllPostsMutation,
} from "./postsMutations";
import { createPost, fetchPosts } from "../../services/postsService";

export const getAllPosts = () => {
  return (dispatch) => {
    dispatch(enablePostsIsFetching());
    fetchPosts()
      .then((res) => {
        console.log("res", res);
        dispatch(getAllPostsMutation(res));
        dispatch(disablePostsIsFetching());
      })
      .catch((e) => console.error(e));
  };
};

export const addNewPost = (data) => {
  return (dispatch) => {
    createPost(data)
      .then(() => {
        dispatch(addNewPostMutation(data));
      })
      .catch((e) => console.error(e));
  };
};
