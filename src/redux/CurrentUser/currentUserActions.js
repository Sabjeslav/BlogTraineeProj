import {
  getCurrentUserMutation,
  logInMutation,
  logOutMutation,
} from "./currentUserMutations";
import {
  authUser,
  deleteCurrentUserAcc,
  fetchCurrentUser,
} from "../../services/currentUser.service";
import { deleteUserMutation } from "../Users/usersMutations";

export const getCurrentUser = () => {
  return (dispatch) => {
    fetchCurrentUser()
      .then((res) => {
        dispatch(getCurrentUserMutation(res));
        localStorage.setItem("id", res._id);
      })
      .catch((e) => console.error(e));
  };
};

export const deleteCurrentUser = (id) => {
  return (dispatch) => {
    deleteCurrentUserAcc(id)
      .then(() => {
        dispatch(deleteUserMutation(id));
        dispatch(logOutMutation());
        localStorage.clear();
      })
      .catch((e) => console.error(e));
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch(logOutMutation());
  };
};
export const logIn = (data, history) => {
  return (dispatch) => {
    authUser(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        dispatch(logInMutation());
        dispatch(getCurrentUser());
        history.push("/profile");
      })
      .catch((e) => console.error(e));
  };
};
