import {
  GET_CURRENT_USER,
  GET_USER,
  SET_USER_ERROR,
  TOGGLE_IS_EDITING,
  TOGGLE_LOGIN,
  TOGGLE_LOGOUT,
  UPDATE_USER,
} from "./currentUserTypes";

const userInitialState = {
  isLogged: !!localStorage.token,
  user: {},
  isEditing: false,
  error: null,
};

function currentUserReducer(state = userInitialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state };
    case GET_CURRENT_USER: {
      return { ...state, user: action.data };
    }
    case UPDATE_USER: {
      return { ...state, user: { ...state.user, ...action.data } };
    }
    case TOGGLE_IS_EDITING: {
      return { ...state, isEditing: !state.isEditing };
    }
    case TOGGLE_LOGIN: {
      return { ...state, isLogged: true };
    }
    case TOGGLE_LOGOUT: {
      return { ...state, user: {}, isLogged: false };
    }
    case SET_USER_ERROR: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
}

export default currentUserReducer;
