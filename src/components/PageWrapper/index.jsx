import React from "react";
import style from "./PageContainer.module.sass";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackbar } from "../../redux/Posts/postsActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PageWrapper({ children }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.posts.snackbar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(toggleSnackbar());
  };
  return (
    <div className={style.main}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Post added successfully!
        </Alert>
      </Snackbar>
      {children}
    </div>
  );
}
