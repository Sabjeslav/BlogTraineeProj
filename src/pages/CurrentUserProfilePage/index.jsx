import React from "react";
import style from "./CurrentUserProfilePage.module.sass";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import Profile from "../../components/Profile";
import { useDispatch, useSelector } from "react-redux";
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
  const logOutHandler = () => {
    localStorage.clear();
    dispatch(logOut());
    history.push("/signIn");
  };
  const deleteAccount = async () => {
    dispatch(deleteCurrentUser(user._id));
    history.push("/signIn");
  };
  const showPosts = () => {
    history.push("/userposts");
  };
  const editHandler = () => {
    dispatch(toggleIsEditing());
  };
  return (
    <div className={style.profileOuterWrapper}>
      {isEditing ? (
        <EditProfileForm editHandler={editHandler} />
      ) : (
        <>
          <Profile user={user} />
          <div className={cx(style.profileRow, style.buttonRow)}>
            <button className={style.profileBtn} onClick={showPosts}>
              My posts
            </button>
            <button className={style.profileBtn} onClick={editHandler}>
              Edit profile
            </button>
            <button
              className={cx(style.profileBtn, style.warningBtn)}
              onClick={deleteAccount}
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
  );
}

export default CurrentUserProfilePage;
