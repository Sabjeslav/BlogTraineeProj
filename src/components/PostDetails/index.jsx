import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import Spinner from '../Spinner';
import {
  faHeart,
  faPen,
  faTrashAlt,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

import style from './PostDetails.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  deletePostById,
  getPostById,
  likePostById,
  getPostComments,
} from '../../services/posts.service';
import PostComment from './PostComment';
import { newCommentSchema } from '../../utils/validationSchemas';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axiosInstance from '../../services/axios.instance';

function PostDetails (props) {
  const {
    user: { user },
    users: { users },
  } = props;
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(null);
  const [comments, setcomments] = useState([]);
  const history = useHistory();
  const getPostDetails = async () => {
    await getPostById(id)
      .then(response => {
        setPost(response);
        setLikes(response.likes.length);
        setIsLiked(response.likes.includes(localStorage.id));
        setLoaded(true);
      })
      .catch(err => console.error(err));
  };
  const loadPostComments = async () => {
    await getPostComments(id)
      .then(response => {
        console.log(response);
        setcomments(response);
      })
      .catch(err => console.error(err));
  };
  const deletePost = async () => {
    await deletePostById(id)
      .then(() => history.push('/posts'))
      .catch(err => console.error(err));
  };
  const likePost = async () => {
    if (localStorage.id !== user._id || !localStorage.id)
      return history.push('/signIn');
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    await likePostById(id)
      .then(() => {})
      .catch(err => console.error(err));
  };
  useEffect(() => {
    getPostDetails();
    loadPostComments();
  }, []);
  if (!loaded) return <Spinner />;
  return (
    <div className={style.postWrapper}>
      <div className={style.postTitle}>{post.title}</div>
      <div className={style.postDescription}>{post.description}</div>
      <div className={style.postFullText}>{post.fullText}</div>
      <div className={style.postFooter}>
        <div className={style.postLikes}>
          <FontAwesomeIcon
            onClick={likePost}
            className={cx(style.likeIcon, {
              [style.liked]: isLiked,
            })}
            icon={faHeart}
          />
          {likes}
        </div>
        {localStorage.id === post.postedBy ? (
          <div className={style.postActions}>
            <div className={cx(style.btnWrapper, style.editBtn)}>
              <FontAwesomeIcon icon={faPen} />
              <button className={style.actionBtn}>Edit</button>
            </div>
            <div className={cx(style.btnWrapper, style.deleteBtn)}>
              <FontAwesomeIcon icon={faTrashAlt} />
              <button onClick={deletePost} className={style.actionBtn}>
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className={style.commentForm}>
        <Formik
          initialValues={{
            text: '',
          }}
          validationSchema={newCommentSchema}
          onSubmit={async (values, actions) => {
            await axiosInstance({
              method: 'post',
              url: `/comments/post/${id}`,
              data: {
                text: values.text,
                followedCommentID: null,
              },
            })
              .then(() => {
                loadPostComments();
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

              <button type='submit' className={style.submitBtn}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </div>
            <ErrorMessage
              className={style.errorMsg}
              component='div'
              name='text'
            />
          </Form>
        </Formik>
      </div>
      <div className={style.commentsWrapper}>
        {comments.map(comment => {
          return (
            <PostComment
              key={comment._id}
              update={loadPostComments}
              comment={comment}
            />
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PostDetails);
