import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { newPostSchema } from '../../utils/validationSchemas';
import style from './PostCreation.sass';

function PostCreation () {
  return (
    <div>
      <h1>New post</h1>
      <Formik
        initialValues={{
          title: '',
          fullText: '',
          description: '',
        }}
        validationSchema={newPostSchema}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className={style.formWrapper}>
          <div className={style.formSection}>
            <label htmlFor='login'>Login</label>
            <Field
              className={style.inputField}
              name='login'
              placeholder='Login'
            />
            <ErrorMessage
              component='div'
              className={style.errorMsg}
              name='login'
            />
          </div>

          <div className={style.formSection}>
            <label htmlFor='password'>Password</label>
            <Field
              className={style.inputField}
              name='password'
              placeholder='Password'
              type='password'
            />
            <ErrorMessage
              component='div'
              className={style.errorMsg}
              name='password'
            />
          </div>

          <div className={style.formSection}>
            <label htmlFor='email'>Email</label>
            <Field
              className={style.inputField}
              name='email'
              placeholder='example@mail.to'
              type='email'
            />
            <ErrorMessage
              component='div'
              className={style.errorMsg}
              name='email'
            />
          </div>
          <button className={style.submitBtn} type='submit'>
            Sign in
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default PostCreation;
