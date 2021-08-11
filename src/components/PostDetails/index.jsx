import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import Spinner from '../Spinner';
import { faHeart, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

import style from './PostDetails.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  deletePostById,
  getPostById,
  likePostById,
} from '../../services/posts.service';

function PostDetails (props) {
  const {
    user: { user },
  } = props;
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(null);
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
  const deletePost = async () => {
    await deletePostById(id)
      .then(() => history.push('/posts'))
      .catch(err => console.error(err));
  };
  const likePost = async () => {
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
  }, []);
  console.log('isLiked', isLiked);
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
        {user._id === post.postedBy ? (
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
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PostDetails);
