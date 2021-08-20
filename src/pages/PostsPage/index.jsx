import React from "react";
import style from "./PostsPage.module.sass";
import Post from "../../components/Post";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { setPage } from "../../redux/Posts/postsActions";

export default function PostsPage() {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const postsPerPage = 9;
  const pagesAmount = Math.ceil(postsState.pagination.total / postsPerPage);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };

  if (postsState.isFetching) {
    return <Spinner />;
  }
  return (
    <div className={style.postsContainer}>
      <h1>Posts</h1>
      <div>{postsState.error}</div>
      <div className={style.postsWrapper}>
        {postsState.posts
          .slice(
            (postsState.page - 1) * postsPerPage,
            postsState.page * postsPerPage
          )
          .map((post) => {
            return <Post key={post._id} post={post} />;
          })}
      </div>
      <div className={classes.root}>
        <Pagination
          count={pagesAmount}
          defaultPage={1}
          page={postsState.page}
          onChange={handleChange}
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}
