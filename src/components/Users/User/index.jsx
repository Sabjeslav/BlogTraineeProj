import React from 'react';
import PropTypes from 'prop-types';

import style from './User.module.sass';
import { Link } from 'react-router-dom';

function User ({ user }) {
  return (
    <div className={style.userWrapper}>
      <div className={style.userAttr}>{user.name}</div>
      <div className={style.userAttr}>{user.email}</div>
      <Link
        to={`/users/${user._id}`}
        params={{ user: user }}
        className={style.viewBtn}
      >
        View profile
      </Link>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
