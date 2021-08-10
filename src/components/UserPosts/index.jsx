import React from 'react';
import { connect } from 'react-redux';
import Post from '../Posts/Post';
import style from './UserPosts.module.sass';

export const UserPosts = props => {
  const {
    posts: { posts },
    user: { user },
  } = props;
  const userPosts = posts.filter(post => post.postedBy === user._id);
  console.log(userPosts);
  return (
    <div className={style.postsWrapper}>
      {userPosts.map(post => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
