import {
  addUserMutation,
  disableUsersIsFetching,
  enableUsersIsFetching,
  getAllUsersMutation,
} from "./usersMutations";
import { createUser, fetchUsers } from "../../services/usersService";
import { logIn } from "../CurrentUser/currentUserActions";

export const getAllUsers = () => {
  return (dispatch) => {
    dispatch(enableUsersIsFetching());
    fetchUsers()
      .then((res) => {
        dispatch(getAllUsersMutation(res));
        dispatch(disableUsersIsFetching());
      })
      .catch((e) => console.error(e));
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
      .catch((e) => console.error(e));
  };
};
