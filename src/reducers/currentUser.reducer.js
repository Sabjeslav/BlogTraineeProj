import { USER_ACTION_TYPES } from '../actions/actions';

const userInitialState = {
  isLogged: localStorage.getItem('isLogged') || false ,
};

function currentUserReducer (state = userInitialState, action) {
  switch (action.type) {
    case USER_ACTION_TYPES.GET_USER:
      return { ...state };
    case USER_ACTION_TYPES.POST_USER: {
      return { ...state, user: action.newUser };
    }
    case USER_ACTION_TYPES.TOGGLE_LOGIN: {
      return { ...state, isLogged: true };
    }
    case USER_ACTION_TYPES.TOGGLE_LOGOUT: {
      return { ...state, isLogged: false };
    }
    default:
      return state;
  }
}

export default currentUserReducer;
