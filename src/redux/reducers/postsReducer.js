import { POSTS_ACTION_TYPES } from "../actions/actions";

const postsInitialState = {
  posts: [],
  isFetching: false,
  loaded: false,
};

function postsReducer (state = postsInitialState, action) {
  switch (action.type) {
    case POSTS_ACTION_TYPES.GET_POSTS:
      return { ...state };
    case POSTS_ACTION_TYPES.UPLOAD_POSTS:
      return { ...state, posts: action.newPosts };
    case POSTS_ACTION_TYPES.ENABLE_POSTS_ISFETCHING: {
      if (state.loaded) return state;
      return { ...state, isFetching: true };
    }
    case POSTS_ACTION_TYPES.DISABLE_POSTS_ISFETCHING: {
      return { ...state, isFetching: false, loaded: true };
    }
    default:
      return state;
  }
}

export default postsReducer;
