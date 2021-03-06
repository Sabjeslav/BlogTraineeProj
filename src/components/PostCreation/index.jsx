import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { newPostSchema } from "../../utils/validationSchemas";
import style from "./PostCreation.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, setPostError } from "../../redux/Posts/postsActions";
import { useHistory } from "react-router-dom";

const cx = require("classnames");

function PostCreation() {
  const errorMessage = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    return () => {
      dispatch(setPostError(""));
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <h1>New post</h1>
      <Formik
        initialValues={{
          title: "",
          fullText: "",
          description: "",
        }}
        validationSchema={newPostSchema}
        onSubmit={async (values, actions) => {
          dispatch(addNewPost(values, history));
          actions.resetForm();
        }}
      >
        <Form className={style.formWrapper}>
          <div className={style.formSection}>
            <Field
              className={style.inputField}
              name="title"
              placeholder="Title"
            />
            <ErrorMessage
              component="div"
              className={style.errorMsg}
              name="title"
            />
          </div>

          <div className={style.formSection}>
            <label htmlFor="fullText">Full text</label>
            <Field
              className={cx(style.inputField, style.inputArea)}
              name="fullText"
              as="textarea"
              placeholder="Full text"
              type="text"
            />
            <ErrorMessage
              component="div"
              className={style.errorMsg}
              name="fullText"
            />
          </div>

          <div className={style.formSection}>
            <Field
              className={style.inputField}
              name="description"
              placeholder="Description"
              type="text"
            />
            <ErrorMessage
              component="div"
              className={style.errorMsg}
              name="description"
            />
          </div>
          <div className={style.errorMsg}>{errorMessage}</div>
          <button className={style.submitBtn} type="submit">
            Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default PostCreation;
