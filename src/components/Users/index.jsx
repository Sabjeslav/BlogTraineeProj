import React, { useState, useEffect } from 'react';
import User from './User';
import Spinner from '../Spinner';
import style from './Users.module.sass';
import { USERS_ACTION_TYPES } from '../../actions/actions';
import { connect } from 'react-redux';
const axios = require('axios');

function Users (props) {
  const { users, postUsers, isFetching, toggleIsFetching } = props;
  // const [users, setUsers] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  const getUsers = async () => {
    toggleIsFetching();
    axios
      .get('https://nodejs-test-api-blog.herokuapp.com/api/v1/users')
      .then(response => {
        postUsers(response.data);
        toggleIsFetching();
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className={style.usersWrapper}>
      <div>
        <span className={style.columnHeader}>Name</span>
        <span className={style.columnHeader}>Email</span>
      </div>
      {users.map(user => {
        return <User key={user._id} user={user} />;
      })}
    </div>
  );
}

const mapStateToProps = state => state.users;

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch({ type: USERS_ACTION_TYPES.GET_USERS }),
    postUsers: newUsers =>
      dispatch({ type: USERS_ACTION_TYPES.POST_USERS, newUsers }),
    toggleIsFetching: () =>
      dispatch({ type: USERS_ACTION_TYPES.TOGGLE_ISFETCHING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
