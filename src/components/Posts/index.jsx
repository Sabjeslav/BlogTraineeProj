import React from 'react';
import style from './Posts.module.sass';
import Post from './Post';
import { connect } from 'react-redux';
import Spinner from '../Spinner';

function Posts (props) {
  const { posts, isFetching } = props;
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

export default connect(mapStateToProps)(Posts);
