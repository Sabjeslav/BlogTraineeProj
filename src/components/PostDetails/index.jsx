import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import cx from "classnames";
import {
  faHeart,
  faPen,
  faPlay,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  addPostComment,
  deletePostById,
  editPost,
  getPostById,
  getPostComments,
  likePostById,
} from "../../services/postsService";

import Spinner from "../Spinner";
import PostComment from "./PostComment";
import { newCommentSchema, newPostSchema } from "../../utils/validationSchemas";
import style from "./PostDetails.module.sass";

export default function PostDetails() {
  const { user } = useSelector(({ user }) => user);
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const history = useHistory();
  const getPostDetails = async () => {
    await getPostById(id)
      .then((response) => {
        setPost(response);
        setLikes(response.likes.length);
        setIsLiked(response.likes.includes(localStorage.id));
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  };
  const loadPostComments = async () => {
    await getPostComments(id)
      .then((response) => setComments(response))
      .catch((err) => console.error(err));
  };
  const deletePost = async () => {
    await deletePostById(id)
      .then(() => history.push("/posts"))
      .catch((err) => console.error(err));
  };
  const likePost = async () => {
    if (localStorage.id !== user._id || !localStorage.id)
      return history.push("/signIn");
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
    await likePostById(id).catch((err) => console.error(err));
  };
  useEffect(() => {
    getPostDetails();
    loadPostComments();
  }, []);
  if (!loaded) return <Spinner />;
  return (
    <div className={style.postWrapper}>
      {isEditing ? (
        <Formik
          initialValues={{
            title: post.title,
            fullText: post.fullText,
            description: post.description,
          }}
          validationSchema={newPostSchema}
          onSubmit={async (values, actions) => {
            const newPost = {
              title: values.title,
              fullText: values.fullText,
              description: values.description,
            };
            await editPost(post._id, newPost)
              .then(() => {
                setIsEditing(false);
                setPost({ ...post, ...newPost });
              })
              .catch((err) => console.error(err));
          }}
        >
          <Form>
            <Field
              className={cx(style.postTitle, style.activeInput)}
              id="title"
              name="title"
              placeholder="Write a title"
            />
            <ErrorMessage
              className={style.errorMsg}
              component="div"
              name="title"
            />
            <Field
              className={cx(style.postDescription, style.activeInput)}
              id="description"
              name="description"
              placeholder="Description"
            />
            <ErrorMessage
              className={style.errorMsg}
              component="div"
              name="description"
            />
            <Field
              className={cx(style.postFullText, style.activeInput)}
              id="fullText"
              name="fullText"
              placeholder="Fulltext"
            />
            <ErrorMessage
              className={style.errorMsg}
              component="div"
              name="fullText"
            />
            <button type="submit" className={style.submitBtn}>
              OK
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
              }}
              className={style.submitBtn}
            >
              Cancel
            </button>
          </Form>
        </Formik>
      ) : (
        <>
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
                <div
                  onClick={() => setIsEditing(true)}
                  className={cx(style.btnWrapper, style.editBtn)}
                >
                  <FontAwesomeIcon icon={faPen} />
                  <button className={style.actionBtn}>Edit</button>
                </div>
                <div
                  onClick={deletePost}
                  className={cx(style.btnWrapper, style.deleteBtn)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <button className={style.actionBtn}>Delete</button>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
      <div className={style.commentForm}>
        <Formik
          initialValues={{
            text: "",
          }}
          validationSchema={newCommentSchema}
          onSubmit={async (values, actions) => {
            await addPostComment(post._id, values.text)
              .then(() => {
                loadPostComments();
                actions.resetForm();
              })
              .catch((err) => console.error(err));
          }}
        >
          <Form>
            <div className={style.formWrapper}>
              <Field
                className={style.commentInput}
                id="text"
                name="text"
                placeholder="Write a comment..."
              />
              <button type="submit" className={style.submitBtn}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </div>
            <ErrorMessage
              className={style.errorMsg}
              component="div"
              name="text"
            />
          </Form>
        </Formik>
      </div>
      <div className={style.commentsWrapper}>
        {comments.map((comment) => {
          if (comment.followedCommentID) return null;
          return (
            <PostComment
              key={comment._id}
              updatePosts={loadPostComments}
              comment={comment}
            />
          );
        })}
      </div>
    </div>
  );
}
