import {
  disablePostsIsFetching,
  enablePostsIsFetching,
  getAllPostsMutation,
} from "./postsMutations";
import { fetchPosts } from "../../services/posts.service";

export const getAllPosts = () => {
  return (dispatch) => {
    dispatch(enablePostsIsFetching());
    fetchPosts()
      .then((res) => {
        dispatch(getAllPostsMutation(res));
        dispatch(disablePostsIsFetching());
      })
      .catch((e) => console.error(e));
  };
};
