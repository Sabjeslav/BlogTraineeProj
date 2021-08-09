import { combineReducers } from 'redux';
import currentUserReducer from './currentUser.reducer';
import usersReducer from './users.reducer';

const rootReducer = combineReducers({
  user: currentUserReducer,
  users: usersReducer,
});

export default rootReducer;
