import {
  GET_CURRENT_USER,
  SET_USER_ERROR,
  TOGGLE_LOGIN,
  TOGGLE_LOGOUT,
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
