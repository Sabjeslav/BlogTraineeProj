import React from 'react';
import PropTypes from 'prop-types';

import style from './User.module.sass';

function User ({ user }) {
  return (
    <div className={style.userWrapper}>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}

export default User;

User.propTypes = {
  user: PropTypes.object.isRequired,
};
