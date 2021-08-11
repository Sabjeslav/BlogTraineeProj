import React from 'react';
import User from './User';
import Spinner from '../Spinner';
import style from './Users.module.sass';
import { connect } from 'react-redux';

function Users (props) {
  const { users, isFetching } = props;
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

export default connect(mapStateToProps)(Users);
