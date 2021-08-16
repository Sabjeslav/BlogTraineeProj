import { USERS_ACTION_TYPES } from "../actions/actions";

const usersInitialState = {
  users: [],
  isFetching: false,
  loaded: false,
};

function usersReducer (state = usersInitialState, action) {
  switch (action.type) {
    case USERS_ACTION_TYPES.GET_USERS:
      return { ...state };
    case USERS_ACTION_TYPES.POST_USERS:
      return { ...state, users: action.newUsers };
    case USERS_ACTION_TYPES.ENABLE_USERS_ISFETCHING: {
      if (state.loaded) return state;
      return { ...state, isFetching: true };
    }
    case USERS_ACTION_TYPES.DISABLE_USERS_ISFETCHING: {
      return { ...state, isFetching: false, loaded: true };
    }
    default:
      return state;
  }
}

export default usersReducer;
