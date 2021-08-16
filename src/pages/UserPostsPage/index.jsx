import React from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import style from "./UserPosts.module.sass";

export default function UserPostsPage() {
  const postsArray = useSelector(({ posts }) => posts.posts);
  const user = useSelector(({ user }) => user.user);
  const userPosts = postsArray.filter((post) => post.postedBy === user._id);
  return (
    <div className={style.postsWrapper}>
      {userPosts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
