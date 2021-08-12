import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import style from './PostComment.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../services/axios.instance';
import { deletePostComment } from '../../../services/posts.service';

function PostComment (props) {
  const {
    comment,
    users: { users },
    user: { user },
    update
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteComment = async () => {
    handleClose();
    await deletePostComment(comment._id).then(res => {
      update();
      console.log(res);
    });
  };
  return (
    <div className={style.commentsWrapper}>
      <div key={comment._id} className={style.postComment}>
        <div className={style.commentHeader}>
          <div className={style.authorName}>
            {users.map(user => {
              if (user._id === comment.commentedBy) {
                return <span key={comment._id}>{user.name}</span>;
              }
            })}
          </div>
          <div>{new Date(comment.dateCreated).toLocaleDateString()}</div>
          {comment.commentedBy === user._id ? (
            <>
              <Button
                className={style.menuBtn}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={deleteComment}>Delete</MenuItem>
              </Menu>
            </>
          ) : null}
        </div>
        <div className={style.commentText}>{comment.text}</div>
      </div>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PostComment);
