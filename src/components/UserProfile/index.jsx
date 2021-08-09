import React from 'react';
import style from './UserProfile.module.sass';

function UserProfile ({ user }) {
  return (
    <>
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
    </>
  );
}

export default UserProfile;
