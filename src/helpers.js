import { authUser } from "./services/currentUser.service";
import { createUser } from "./services/usersService";
import { createPost } from "./services/posts.service";

export const signIn = async (data, history, setError) => {
  return authUser({
    email: data.email,
    password: data.password,
  })
    .then((res) => {
      localStorage.setItem("token", res.token);
      history.push("/profile");
    })
    .catch((err) => setError(err));
};

export const signUp = async (data, history, setError) => {
  return createUser(data)
    .then(() => signIn(data, history, setError))
    .catch((err) => setError(err));
};

export const addNewPost = async (data, history, setError) => {
  return createPost(data)
    .then(() => history.push("/posts"))
    .catch((err) => setError(err));
};
