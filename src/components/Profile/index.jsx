import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SignInForm from '../SignInForm';
import style from './Profile.module.sass';

const axios = require('axios');

function Profile () {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});
  const logOut = () => {
    localStorage.removeItem('token');
    return <Redirect to='/signIn' component={SignInForm} />;
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
        setUser(res.data);
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
      <div className={style.profileRow}>
        <button className={style.logoutBtn} onClick={logOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Profile;
