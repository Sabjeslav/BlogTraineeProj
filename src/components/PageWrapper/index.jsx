import React from "react";
import style from "./PageContainer.module.sass";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackbar } from "../../redux/Snackbar/snackbarActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PageWrapper({ children }) {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(toggleSnackbar("Post added successfully"));
  };
  return (
    <div className={style.main}>
      <Snackbar
        open={snackbar.isOpened}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </div>
  );
}
