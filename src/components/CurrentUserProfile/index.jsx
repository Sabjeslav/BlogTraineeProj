import React, { useState, useEffect } from 'react';
import style from './Profile.module.sass';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ACTION_TYPES } from '../../actions/actions';
import cx from 'classnames';
import UserProfile from '../UserProfile';

const axios = require('axios');

function CurrentUserProfile (props) {
  const { toggleLogout, postUser, user } = props;
  const history = useHistory();
  const token = localStorage.getItem('token');
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLogged');
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
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className={style.profileWrapper}>
      <UserProfile user={user} />
      <div className={cx(style.profileRow, style.buttonRow)}>
        <button className={style.profileBtn}>Your posts</button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfile);
