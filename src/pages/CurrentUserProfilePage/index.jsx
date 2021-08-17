import React from "react";
import style from "./CurrentUserProfilePage.module.sass";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import Profile from "../../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCurrentUser,
  logOut,
} from "../../redux/CurrentUser/currentUserActions";

function CurrentUserProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
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

  return (
    <div className={style.profileOuterWrapper}>
      <Profile user={user} />
      <div className={cx(style.profileRow, style.buttonRow)}>
        <button className={style.profileBtn} onClick={showPosts}>
          Your posts
        </button>
        <button className={style.profileBtn}>Edit profile</button>
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
    </div>
  );
}

export default CurrentUserProfilePage;
