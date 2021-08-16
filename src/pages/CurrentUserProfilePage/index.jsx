import React, { useEffect } from "react";
import style from "./CurrentUserProfilePage.module.sass";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { POSTS_ACTION_TYPES, USER_ACTION_TYPES } from "../../actions/actions";
import cx from "classnames";
import Profile from "../../components/Profile";
import {
  fetchCurrentUser,
  deleteCurrentUserAcc,
} from "../../services/currentUser.service";

function CurrentUserProfilePage(props) {
  const { toggleLogout, postUser, user } = props;
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    toggleLogout();
    history.push("/signIn");
  };
  const getUser = async () => {
    await fetchCurrentUser()
      .then((res) => {
        postUser(res);
        localStorage.setItem("id", res._id);
      })

      .catch((err) => console.error(err));
  };
  const deleteAccount = async () => {
    await deleteCurrentUserAcc(user._id)
      .then(() => {
        localStorage.clear();
        history.push("/signIn");
      })
      .catch((err) => console.error(err));
  };
  const showPosts = () => {
    history.push("/userposts");
  };
  useEffect(() => {
    getUser();
  }, []);

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
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state.user;

const mapDispatchToProps = (dispatch) => {
  return {
    postUser: (newUser) =>
      dispatch({ type: USER_ACTION_TYPES.POST_USER, newUser }),
    toggleLogout: () => dispatch({ type: USER_ACTION_TYPES.TOGGLE_LOGOUT }),
    getPosts: () => dispatch({ type: POSTS_ACTION_TYPES.GET_POSTS }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfilePage);
