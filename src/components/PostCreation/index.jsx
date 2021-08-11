import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { newPostSchema } from '../../utils/validationSchemas';
import style from './PostCreation.module.sass';
import { createPost } from '../../services/posts.service';
const cx = require('classnames');

function PostCreation () {
  return (
    <div className={style.wrapper}>
      <h1>New post</h1>
      <Formik
        initialValues={{
          title: '',
          fullText: '',
          description: '',
        }}
        validationSchema={newPostSchema}
        onSubmit={async (values, actions) => {
          await createPost({
            title: values.title,
            fullText: values.fullText,
            description: values.description,
          })
            .then(res => {
              console.log(res.data);
              actions.resetForm();
            })
            .catch(err => {
              console.error(err);
            });
        }}
      >
        <Form className={style.formWrapper}>
          <div className={style.formSection}>
            <Field
              className={style.inputField}
              name='title'
              placeholder='Title'
            />
            <ErrorMessage
              component='div'
              className={style.errorMsg}
              name='title'
            />
          </div>

          <div className={style.formSection}>
            <label htmlFor='fullText'>Full text</label>
            <Field
              className={cx(style.inputField, style.inputArea)}
              name='fullText'
              as='textarea'
              placeholder='Full text'
              type='text'
            />
            <ErrorMessage
              component='div'
              className={style.errorMsg}
              name='fullText'
            />
          </div>

          <div className={style.formSection}>
            <Field
              className={style.inputField}
              name='description'
              placeholder='Description'
              type='text'
            />
            <ErrorMessage
              component='div'
              className={style.errorMsg}
              name='description'
            />
          </div>
          <button className={style.submitBtn} type='submit'>
            Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default PostCreation;
