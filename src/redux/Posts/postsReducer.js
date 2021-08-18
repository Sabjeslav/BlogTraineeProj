import {
  ADD_NEW_POST,
  DISABLE_POSTS_IS_FETCHING,
  ENABLE_POSTS_IS_FETCHING,
  GET_ALL_POSTS,
  GET_POSTS,
  SET_POST_ERROR,
  TOGGLE_SNACKBAR,
} from "./postsTypes";

const postsInitialState = {
  posts: [],
  isFetching: false,
  loaded: false,
  error: null,
  snackbar: false,
};

function postsReducer(state = postsInitialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state };
    case GET_ALL_POSTS:
      return { ...state, posts: action.data };
    case ADD_NEW_POST: {
      return { ...state, posts: [...state.posts, action.data] };
    }
    case SET_POST_ERROR: {
      return { ...state, error: action.error };
    }
    case TOGGLE_SNACKBAR: {
      return { ...state, snackbar: !state.snackbar };
    }
    case ENABLE_POSTS_IS_FETCHING: {
      if (state.loaded) return state;
      return { ...state, isFetching: true };
    }
    case DISABLE_POSTS_IS_FETCHING: {
      return { ...state, isFetching: false, loaded: true };
    }
    default:
      return state;
  }
}

export default postsReducer;
