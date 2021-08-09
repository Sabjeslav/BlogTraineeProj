import React, { useState, useEffect } from 'react';
import style from './Profile.module.sass';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ACTION_TYPES } from '../../actions/actions';
import cx from 'classnames';

const axios = require('axios');

function Profile (props) {
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
      <div className={style.profileHeader}>Profile</div>
      <div className={style.profileRow}>
        <div className={style.rowCaption}>Email:</div>
        <div className={style.rowContent}>{user.email}</div>
      </div>
      <div className={style.profileRow}>
        <div className={style.rowCaption}>Name:</div>
        <div className={style.rowContent}>{user.name}</div>
      </div>
      <div className={style.profileRow}>
        <div className={style.rowCaption}>Created at:</div>
        <div className={style.rowContent}>{user.dateCreated}</div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
