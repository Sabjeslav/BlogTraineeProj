import React from 'react';
import { connect } from 'react-redux';
import style from './PostComment.module.sass';

function PostComment (props) {
  const {
    comment,
    users: { users },
  } = props;
  return (
    <div className={style.commentsWrapper}>
      <div key={comment._id} className={style.postComment}>
        <div className={style.commentHeader}>
          <div>
            {users.map(user => {
              if (user._id === comment.commentedBy) {
                return (
                  <span key={comment._id} className={style.authorName}>
                    {user.name}
                  </span>
                );
              }
            })}
          </div>
          <div>
            {new Date(comment.dateCreated).toLocaleDateString()}
          </div>
        </div>
        <div className={style.commentText}>{comment.text}</div>
      </div>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PostComment);
