import React from 'react';
import { useParams } from 'react-router-dom';
import style from './UserProfile.module.sass';
import { connect } from 'react-redux';

function UserProfile (props) {
  let { user, users } = props;
  const { id } = useParams();
  if (id) {
    user = users.find(u => u._id === id);
  }
  return (
    <div className={style.profileWrapper}>
      <div className={style.profileHeader}>Profile</div>
      <div className={style.profileContainer}>
        <div className={style.profileData}>
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
        </div>
        <div className={style.profileData}></div>
      </div>
    </div>
  );
}
const mapStateToProps = state => state.users;

export default connect(mapStateToProps)(UserProfile);
