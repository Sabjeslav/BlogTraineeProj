import {
  addUserMutation,
  disableUsersIsFetching,
  enableUsersIsFetching,
  getAllUsersMutation,
  setUsersErrorMutation,
  updateUsersMutation,
} from "./usersMutations";
import { createUser, fetchUsers } from "../../services/usersService";
import { logIn } from "../CurrentUser/currentUserActions";

export const getAllUsers = (skip) => {
  return (dispatch) => {
    dispatch(enableUsersIsFetching());
    fetchUsers(skip)
      .then((res) => {
        console.log("res", res);
        dispatch(setUsersError(null));
        dispatch(getAllUsersMutation(res));
        dispatch(disableUsersIsFetching());
      })
      .catch((e) => {
        dispatch(setUsersError(e));
        console.error(e);
      });
  };
};

export const addNewUser = (data, history) => {
  return (dispatch) => {
    createUser(data)
      .then((res) => {
        console.log(res);
        dispatch(addUserMutation(res));
        dispatch(logIn(data, history));
      })
      .catch((e) => {
        dispatch(setUsersError(e));
        console.error(e);
      });
  };
};

export const setUsersError = (error) => {
  return (dispatch) => {
    dispatch(setUsersErrorMutation(error));
  };
};

export const updateUsers = (data) => {
  console.log("data", data);
  return (dispatch) => {
    dispatch(updateUsersMutation(data));
  };
};
