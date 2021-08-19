import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import style from "./CurrentUserProfilePage.module.sass";
import Profile from "../../components/Profile";
import {
  deleteCurrentUser,
  logOut,
  toggleIsEditing,
} from "../../redux/CurrentUser/currentUserActions";
import EditProfileForm from "../../components/EditProfileForm";

function CurrentUserProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const isEditing = useSelector((state) => state.user.isEditing);
  const [isOpened, setIsOpened] = useState(false);
  const logOutHandler = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/signIn");
  };
  const toggleModal = () => {
    setIsOpened(!isOpened);
  };
  const deleteAccount = async () => {
    dispatch(deleteCurrentUser(user._id));
    history.push("/signIn");
  };
  const editHandler = () => {
    dispatch(toggleIsEditing());
  };
  return (
    <>
      <Dialog
        open={isOpened}
        onClose={toggleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"This action can not be undone"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will not be able to restore your account after this action. Are
            you sure about that?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div className={style.profileOuterWrapper}>
        {isEditing ? (
          <EditProfileForm editHandler={editHandler} />
        ) : (
          <>
            <Profile user={user} />
            <div className={cx(style.profileRow, style.buttonRow)}>
              <button className={style.profileBtn} onClick={editHandler}>
                Edit profile
              </button>
              <button
                className={cx(style.profileBtn, style.warningBtn)}
                onClick={toggleModal}
              >
                Delete account
              </button>
              <button
                className={cx(style.profileBtn, style.warningBtn)}
                onClick={logOutHandler}
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CurrentUserProfilePage;
