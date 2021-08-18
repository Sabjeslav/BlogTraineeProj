import { combineReducers } from "redux";
import currentUserReducer from "../CurrentUser/currentUserReducer";
import usersReducer from "../Users/usersReducer";
import postsReducer from "../Posts/postsReducer";
import snackbarReducer from "../Snackbar/snackbarReducer";

const rootReducer = combineReducers({
  user: currentUserReducer,
  users: usersReducer,
  posts: postsReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
