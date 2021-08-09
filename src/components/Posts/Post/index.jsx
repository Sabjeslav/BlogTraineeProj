import React from 'react';
import style from './Post.module.sass';

function Post ({ post }) {
  return (
    <div className={style.postWrapper}>
      <div className={style.postTitle}>{post.title}</div>
      <div className={style.postDescription}>{post.description}</div>
    </div>
  );
}

export default Post;
