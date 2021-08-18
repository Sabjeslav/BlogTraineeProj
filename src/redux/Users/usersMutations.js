import {
  ADD_USER,
  DELETE_USER,
  DISABLE_USERS_IS_FETCHING,
  ENABLE_USERS_IS_FETCHING,
  GET_ALL_USERS,
  SET_USERS_ERROR,
} from "./usersTypes";

export const getAllUsersMutation = (data) => {
  return {
    type: GET_ALL_USERS,
    data,
  };
};

export const enableUsersIsFetching = () => {
  return {
    type: ENABLE_USERS_IS_FETCHING,
  };
};

export const disableUsersIsFetching = () => {
  return {
    type: DISABLE_USERS_IS_FETCHING,
  };
};

export const deleteUserMutation = (id) => {
  return {
    type: DELETE_USER,
    id,
  };
};

export const addUserMutation = (data) => {
  return {
    type: ADD_USER,
    data,
  };
};

export const setUsersErrorMutation = (error) => {
  return {
    type: SET_USERS_ERROR,
    error,
  };
};
