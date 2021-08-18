import {
  ADD_USER,
  DELETE_USER,
  DISABLE_USERS_IS_FETCHING,
  ENABLE_USERS_IS_FETCHING,
  GET_ALL_USERS,
  GET_USERS,
  SET_USERS_ERROR,
  UPDATE_USERS,
} from "./usersTypes";

const usersInitialState = {
  users: [],
  isFetching: false,
  loaded: false,
  error: null,
};

function usersReducer(state = usersInitialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state };
    case GET_ALL_USERS:
      return { ...state, users: action.data };
    case ADD_USER: {
      return { ...state, users: [...state.users, action.data] };
    }
    case SET_USERS_ERROR: {
      return { ...state, error: action.error };
    }
    case UPDATE_USERS: {
      const targetIndex = state.users.findIndex(
        (user) => user._id === action.data._id
      );
      const copy = Object.assign([], state.users);
      copy.splice(targetIndex, 1, action.data);
      return { ...state, users: copy };
    }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.id),
      };
    case ENABLE_USERS_IS_FETCHING: {
      if (state.loaded) return state;
      return { ...state, isFetching: true };
    }
    case DISABLE_USERS_IS_FETCHING: {
      return { ...state, isFetching: false, loaded: true };
    }
    default:
      return state;
  }
}

export default usersReducer;
