import {
  GET_CURRENT_USER,
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
