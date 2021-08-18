import {
  addUserMutation,
  disableUsersIsFetching,
  enableUsersIsFetching,
  getAllUsersMutation,
  setUsersErrorMutation,
} from "./usersMutations";
import { createUser, fetchUsers } from "../../services/usersService";
import { logIn } from "../CurrentUser/currentUserActions";

export const getAllUsers = () => {
  return (dispatch) => {
    dispatch(enableUsersIsFetching());
    fetchUsers()
      .then((res) => {
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
