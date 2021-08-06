import React from 'react';
import style from './Profile.module.sass';
const axios = require('axios');

function Profile () {
  const token = localStorage.getItem('token');
  console.log(`Bearer ${token}`);
  const getUser = async () => {
    await axios({
      method: 'get',
      url: 'https://nodejs-test-api-blog.herokuapp.com/api/v1/auth/user',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      console.log(res);
    });
  };
  getUser();
  let user = {};
  return (
    <div className={style.profileWrapper}>
      <div className={style.profileHeader}>Profile</div>
      <div>Email: {user.email}</div>
      <div>Name: {user.name}</div>
      <div>Created at: {user.dateCreated}</div>
    </div>
  );
}

export default Profile;
