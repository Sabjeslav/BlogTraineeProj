import { combineReducers } from "redux";
import currentUserReducer from "./currentUser.reducer";
import usersReducer from "./usersReducer";
import postsReducer from "./postsReducer";

const rootReducer = combineReducers({
  user: currentUserReducer,
  users: usersReducer,
  posts: postsReducer,
});

export default rootReducer;
