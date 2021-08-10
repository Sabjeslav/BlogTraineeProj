import React, { useState, useEffect } from 'react';
import style from './Profile.module.sass';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { POSTS_ACTION_TYPES, USER_ACTION_TYPES } from '../../actions/actions';
import cx from 'classnames';
import UserProfile from '../UserProfile';
import Posts from '../Posts';
import Post from '../Posts/Post';

const axios = require('axios');

function CurrentUserProfile (props) {
  const { toggleLogout, postUser, user, posts } = props;
  const history = useHistory();
  const token = localStorage.getItem('token');
  const userPosts = posts.posts.filter(post => post.postedBy === user._id);
  const logOut = () => {
    localStorage.clear();
    toggleLogout();
    history.push('/signIn');
  };
  const getUser = async () => {
    await axios({
      method: 'get',
      url: 'https://nodejs-test-api-blog.herokuapp.com/api/v1/auth/user',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        postUser(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };
  const deleteAccount = async () => {
    await axios({
      method: 'delete',
      url: `https://nodejs-test-api-blog.herokuapp.com/api/v1/users/${user._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        localStorage.clear();
        history.push('/signIn');
      })
      .catch(err => console.error(err));
  };
  const showPosts = () => {
    history.push('/userposts');
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className={style.profileWrapper}>
      <UserProfile user={user} />
      <div className={cx(style.profileRow, style.buttonRow)}>
        <button className={style.profileBtn} onClick={showPosts}>
          Your posts
        </button>
        <button className={style.profileBtn}>
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
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => state.user;

const mapDispatchToProps = dispatch => {
  return {
    postUser: newUser =>
      dispatch({ type: USER_ACTION_TYPES.POST_USER, newUser }),
    toggleLogout: () => dispatch({ type: USER_ACTION_TYPES.TOGGLE_LOGOUT }),
    getPosts: () => dispatch({ type: POSTS_ACTION_TYPES.GET_POSTS }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfile);
