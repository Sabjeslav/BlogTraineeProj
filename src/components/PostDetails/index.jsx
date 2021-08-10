import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from '../Spinner';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import style from './PostDetails.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PostDetails () {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const getPostDetails = async () => {
    await axios
      .get(`https://nodejs-test-api-blog.herokuapp.com/api/v1/posts/${id}`)
      .then(response => {
        setPost(response.data);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  };

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
        <FontAwesomeIcon className={style.likeIcon} icon={faHeart} />
        {!loaded ? 0 : post.likes.length}
      </div>
    </div>
  );
}

export default PostDetails;
