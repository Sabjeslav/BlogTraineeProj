import React, { useState } from "react";
import style from "./PostsPage.module.sass";
import Post from "../../components/Post";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

export default function PostsPage() {
  const postsState = useSelector((state) => state.posts);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const postsPerPage = 9;
  const pagesAmount = Math.ceil(postsState.posts.length / postsPerPage);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const handleChange = (event, value) => {
    setPage(value);
  };

  const classes = useStyles();

  if (postsState.isFetching) {
    return <Spinner />;
  }

  return (
    <div className={style.postsContainer}>
      <h1>Posts</h1>
      <div>{postsState.error}</div>
      <div className={style.postsWrapper}>
        {postsState.posts
          .slice((page - 1) * postsPerPage, page * postsPerPage)
          .map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        {/*{postsState.posts.map((post) => {*/}
        {/*  return <Post key={post._id} post={post} />;*/}
        {/*})}*/}
      </div>
      <div className={classes.root}>
        <Pagination
          count={pagesAmount}
          defaultPage={1}
          page={page}
          onChange={handleChange}
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}
