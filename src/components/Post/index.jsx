import { Link } from "react-router-dom";
import React from "react";
import style from "./Post.module.sass";

export default function Post({ post }) {
  return (
    <div className={style.postWrapper}>
      <div className={style.postTitle}>{post.title}</div>
      <div className={style.postDescription}>{post.description}</div>
      <Link to={`/posts/${post._id}`} className={style.detailsBtn}>
        View details
      </Link>
    </div>
  );
}
