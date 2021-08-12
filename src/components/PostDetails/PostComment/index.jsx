import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faHeart,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import style from './PostComment.module.sass';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import {
  deletePostComment,
  editPostComment,
  likePostComment,
} from '../../../services/posts.service';
import cx from 'classnames';
import { newCommentSchema } from '../../../utils/validationSchemas';

function PostComment (props) {
  const {
    comment,
    users: { users },
    user: { user },
    updatePosts,
  } = props;
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(
    comment.likes.includes(localStorage.id)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [likes, setLikes] = useState(comment.likes.length);
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
      updatePosts();
    });
  };
  const editComment = () => {
    handleClose();
    setIsEditing(true);
  };
  const likeComment = async () => {
    if (localStorage.id !== user._id || !localStorage.id)
      return history.push('/signIn');
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    await likePostComment(comment._id)
      .then(() => {
        updatePosts();
      })
      .catch(err => console.error(err));
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
                <MenuItem onClick={editComment}>Edit</MenuItem>
                <MenuItem onClick={deleteComment}>Delete</MenuItem>
              </Menu>
            </>
          ) : null}
        </div>
        {isEditing ? (
          <Formik
            initialValues={{
              text: comment.text,
            }}
            validationSchema={newCommentSchema}
            onSubmit={async (values, actions) => {
              await editPostComment(comment._id, values.text)
                .then(() => {
                  updatePosts();
                  setIsEditing(false);
                  actions.resetForm();
                })
                .catch(err => console.error(err));
            }}
          >
            <Form>
              <div className={style.formWrapper}>
                <Field
                  className={style.commentInput}
                  id='text'
                  name='text'
                  placeholder='Write a comment...'
                />
              </div>
              <button type='submit' className={style.submitBtn}>
                OK
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsEditing(false);
                }}
                className={style.submitBtn}
              >
                Cancel
              </button>
              <ErrorMessage
                className={style.errorMsg}
                component='div'
                name='text'
              />
            </Form>
          </Formik>
        ) : (
          <>
            <div className={style.commentText}>{comment.text}</div>
            <div className={style.likes}>
              <FontAwesomeIcon
                onClick={likeComment}
                className={cx(style.likeIcon, {
                  [style.liked]: isLiked,
                })}
                icon={faHeart}
              />
              {likes}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PostComment);
