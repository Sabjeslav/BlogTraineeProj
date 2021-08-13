import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './UserProfile.module.sass';
import { connect } from 'react-redux';
import imgPlaceholder from '../../img/avatar-placeholder.png';
import cx from 'classnames';

function UserProfile (props) {
  let { user, users } = props;
  const { id } = useParams();
  if (id) {
    user = users.find(u => u._id === id);
  }
  const [isScaled, setIsScaled] = useState(false);
  const scaleImage = () => {
    setIsScaled(!isScaled);
  };
  console.log(user);
  const imgLink = `https://nodejs-test-api-blog.herokuapp.com/${user.avatar}`;
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
            <div className={style.rowCaption}>Creation date:</div>
            <div className={style.rowContent}>
              {new Date(user.dateCreated).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className={style.profileData}>
          <div className={style.imgContainer}>
            <img
              className={cx(style.profileImg, {
                [style.scaled]: isScaled,
              })}
              onClick={scaleImage}
              src={imgLink}
              alt=''
            />
            <img className={style.imgPlaceholder} src={imgPlaceholder} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => state.users;

export default connect(mapStateToProps)(UserProfile);
