import {
  ADD_NEW_POST,
  DISABLE_POSTS_IS_FETCHING,
  ENABLE_POSTS_IS_FETCHING,
  GET_ALL_POSTS,
  GET_POSTS,
} from "./postsTypes";

const postsInitialState = {
  posts: [],
  isFetching: false,
  loaded: false,
  error: {},
};

function postsReducer(state = postsInitialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state };
    case GET_ALL_POSTS:
      return { ...state, posts: action.data };
    case ENABLE_POSTS_IS_FETCHING: {
      if (state.loaded) return state;
      return { ...state, isFetching: true };
    }
    case ADD_NEW_POST: {
      return { ...state, posts: [...state.posts, action.data] };
    }
    case DISABLE_POSTS_IS_FETCHING: {
      return { ...state, isFetching: false, loaded: true };
    }
    default:
      return state;
  }
}

export default postsReducer;
