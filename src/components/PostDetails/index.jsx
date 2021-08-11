import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../constants';
import Spinner from '../Spinner';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';

import style from './PostDetails.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostDetails (props) {
  const { user } = props;
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
      <div className={style.postFullText}>
        <div className={style.postLikes}>
          <FontAwesomeIcon className={cx(style.likeIcon)} icon={faHeart} />
          {post.likes.length}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(PostDetails);
