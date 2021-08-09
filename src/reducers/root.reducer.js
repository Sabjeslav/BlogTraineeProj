import { combineReducers } from 'redux';
import currentUserReducer from './currentUser.reducer';
import usersReducer from './users.reducer';
import postsReducer from './posts.reducer';

const rootReducer = combineReducers({
  user: currentUserReducer,
  users: usersReducer,
  posts: postsReducer,
});

export default rootReducer;
