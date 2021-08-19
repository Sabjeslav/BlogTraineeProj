import {
  ADD_NEW_POST,
  DISABLE_POSTS_IS_FETCHING,
  ENABLE_POSTS_IS_FETCHING,
  GET_ALL_POSTS,
  GET_POSTS,
  SET_PAGE,
  SET_POST_ERROR,
} from "./postsTypes";

const postsInitialState = {
  posts: [],
  isFetching: false,
  loaded: false,
  error: null,
  page: 1,
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
    case SET_PAGE: {
      return { ...state, page: action.page };
    }
    case ENABLE_POSTS_IS_FETCHING: {
      return { ...state, isFetching: true, loaded: false };
    }
    case DISABLE_POSTS_IS_FETCHING: {
      return { ...state, isFetching: false, loaded: true };
    }
    default:
      return state;
  }
}

export default postsReducer;
