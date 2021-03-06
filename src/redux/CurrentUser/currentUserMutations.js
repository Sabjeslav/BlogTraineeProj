import {
  GET_CURRENT_USER,
  SET_USER_ERROR,
  TOGGLE_IS_EDITING,
  TOGGLE_LOGIN,
  TOGGLE_LOGOUT,
  UPDATE_USER,
} from "./currentUserTypes";

export const getCurrentUserMutation = (data) => {
  return {
    type: GET_CURRENT_USER,
    data,
  };
};

export const logOutMutation = () => {
  return {
    type: TOGGLE_LOGOUT,
  };
};

export const logInMutation = () => {
  return {
    type: TOGGLE_LOGIN,
  };
};

export const setErrorMutation = (error) => {
  return {
    type: SET_USER_ERROR,
    error,
  };
};

export const updateUserMutation = (data) => {
  return {
    type: UPDATE_USER,
    data,
  };
};

export const toggleIsEditingMutation = () => {
  return {
    type: TOGGLE_IS_EDITING,
  };
};
