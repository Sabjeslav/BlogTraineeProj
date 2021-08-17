import { createPost } from "./services/posts.service";

export const addNewPost = async (data, history, setError) => {
  return createPost(data)
    .then(() => history.push("/posts"))
    .catch((err) => setError(err));
};
