import React from "react";
import style from "./PostsPage.module.sass";
import Post from "../../components/Post";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

export default function PostsPage() {
  const postsState = useSelector((state) => state.posts);
  if (postsState.isFetching) {
    return <Spinner />;
  }
  return (
    <div className={style.postsContainer}>
      <h1>Posts</h1>
      <div>{postsState.error}</div>
      <div className={style.postsWrapper}>
        {postsState.posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}
