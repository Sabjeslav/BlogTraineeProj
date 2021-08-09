import React from 'react';
import PropTypes from 'prop-types';

import style from './User.module.sass';

function User ({ user }) {
  const clickBtn = () => {
    console.log(user);
  };
  return (
    <div className={style.userWrapper}>
      <div className={style.userAttr}>{user.name}</div>
      <div className={style.userAttr}>{user.email}</div>
      <button className={style.viewBtn} onClick={clickBtn}>
        View profile
      </button>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
