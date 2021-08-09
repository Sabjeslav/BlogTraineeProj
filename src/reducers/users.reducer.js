import { USERS_ACTION_TYPES } from '../actions/actions';

const usersInitialState = {
  users: [],
  isFetching: false,
};

function usersReducer (state = usersInitialState, action) {
  switch (action.type) {
    case USERS_ACTION_TYPES.GET_USERS:
      return { ...state };
    case USERS_ACTION_TYPES.POST_USERS:
      return { ...state, users: action.newUsers };
    case USERS_ACTION_TYPES.TOGGLE_ISFETCHING: {
      return { ...state, isFetching: !state.isFetching };
    }
    default:
      return state;
  }
}

export default usersReducer;
