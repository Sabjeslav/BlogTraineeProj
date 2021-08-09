import React from 'react';
import style from './Form.module.sass';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { newUserSchema } from '../../../utils/validationSchemas';
import axios from 'axios';

function LoginForm () {
  return (
    <div className={style.formContainer}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
        }}
        validationSchema={newUserSchema}
        onSubmit={async (values, actions) => {
          axios
            .post('https://nodejs-test-api-blog.herokuapp.com/api/v1/users', {
              email: values.email,
              password: values.password,
              name: values.username,
            })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.error(err);
            });
          actions.resetForm();
        }}
      >
        <Form className={style.formWrapper}>
          <div className={style.formSection}>
            <Field
              className={style.inputField}
              name='username'
              placeholder='Name'
              type='text'
            />
            <ErrorMessage
              component='div'
              className={style.errorMsg}
              name='username'
            />
          </div>
          <div className={style.formSection}>
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
            Sign up
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;