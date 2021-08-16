import React from "react";
import style from "./PostsPage.module.sass";
import Post from "../../components/Post";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

export default function PostsPage() {
  const posts = useSelector(({ posts }) => posts);
  if (posts.isFetching) {
    return <Spinner />;
  }
  return (
    <div className={style.postsContainer}>
      <h1>Posts</h1>
      <div className={style.postsWrapper}>
        {posts.posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}
