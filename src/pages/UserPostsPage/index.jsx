import React from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import style from "./UserPosts.module.sass";
import Spinner from "../../components/Spinner";

export default function UserPostsPage() {
  const postsState = useSelector((state) => state.posts);
  const user = useSelector(({ user }) => user.user);
  const userPosts = postsState.posts.filter(
    (post) => post.postedBy === user._id
  );
  if (postsState.isFetching) {
    return <Spinner />;
  }
  return (
    <div className={style.postsWrapper}>
      {userPosts.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
}
