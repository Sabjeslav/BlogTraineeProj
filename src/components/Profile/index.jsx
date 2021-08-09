import React, { useState, useEffect } from 'react';
import style from './Profile.module.sass';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ACTION_TYPES } from '../../actions/actions';

const axios = require('axios');

function Profile (props) {
  const { toggleLogout } = props;
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    toggleLogout: () => dispatch({ type: USER_ACTION_TYPES.TOGGLE_LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
