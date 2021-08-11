import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../constants';
import Spinner from '../Spinner';
import { faHeart, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

import style from './PostDetails.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostDetails (props) {
  const {
    user: { user },
  } = props;
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const getPostDetails = async () => {
    await axios
      .get(`${API_URL}/posts/${id}`)
      .then(response => {
        setPost(response.data);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  };
  const deletePost = async () => {};
  console.log(user);
  console.log(post);
  useEffect(() => {
    getPostDetails();
  }, []);
  if (!loaded) return <Spinner />;
  return (
    <div className={style.postWrapper}>
      <div className={style.postTitle}>{post.title}</div>
      <div className={style.postDescription}>{post.description}</div>
      <div className={style.postFullText}>{post.fullText}</div>
      <div className={style.postFooter}>
        <div className={style.postLikes}>
          <FontAwesomeIcon className={style.likeIcon} icon={faHeart} />
          {post.likes.length}
        </div>
        {user._id === post.postedBy ? (
          <div className={style.postActions}>
            <div className={cx(style.btnWrapper, style.editBtn)}>
              <FontAwesomeIcon icon={faPen} />
              <button className={style.actionBtn}>Edit</button>
            </div>
            <div className={cx(style.btnWrapper, style.deleteBtn)}>
              <FontAwesomeIcon icon={faTrashAlt} />
              <button className={style.actionBtn}>Delete</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(PostDetails);
