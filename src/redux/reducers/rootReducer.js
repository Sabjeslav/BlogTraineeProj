import { combineReducers } from "redux";
import currentUserReducer from "../CurrentUser/currentUserReducer";
import usersReducer from "../Users/usersReducer";
import postsReducer from "../Posts/postsReducer";

const rootReducer = combineReducers({
  user: currentUserReducer,
  users: usersReducer,
  posts: postsReducer,
});

export default rootReducer;
