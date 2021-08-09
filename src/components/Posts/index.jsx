import React, { useEffect } from 'react';
import style from './Posts.module.sass';
import { POSTS_ACTION_TYPES } from '../../actions/actions';
import Post from './Post';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../Spinner';

function Posts (props) {
  const {
    posts,
    isFetching,
    enableIsFetching,
    disableIsFetching,
    uploadPosts,
  } = props;
  const getPosts = async () => {
    enableIsFetching();
    axios
      .get('https://nodejs-test-api-blog.herokuapp.com/api/v1/posts')
      .then(response => {
        uploadPosts(response.data);
        disableIsFetching();
      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    getPosts();
  }, []);
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className={style.postsContainer}>
      <h1>Posts</h1>
      <div className={style.postsWrapper}>
        {posts.map(post => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}

const mapStateToProps = state => state.posts;

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => dispatch({ type: POSTS_ACTION_TYPES.GET_POSTS }),
    uploadPosts: newPosts =>
      dispatch({ type: POSTS_ACTION_TYPES.UPLOAD_POSTS, newPosts }),
    enableIsFetching: () =>
      dispatch({ type: POSTS_ACTION_TYPES.ENABLE_POSTS_ISFETCHING }),
    disableIsFetching: () =>
      dispatch({ type: POSTS_ACTION_TYPES.DISABLE_POSTS_ISFETCHING }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
