import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { loginSchema } from '../../utils/validationSchemas';
import { Redirect } from 'react-router-dom';
import style from './SignInForm.module.sass';
import Profile from '../Profile';
const axios = require('axios');

function SignInForm () {
  if (localStorage.getItem('token')) {
    return <Redirect to='/profile' component={Profile} />;
  }
  return (
    <div className={style.wrapper}>
      <h1>Sign in</h1>
      <div className={style.formContainer}>
        <Formik
          initialValues={{
            password: '',
            email: '',
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            console.log(values);
            axios
              .post('https://nodejs-test-api-blog.herokuapp.com/api/v1/auth', {
                email: values.email,
                password: values.password,
              })
              .then(res => {
                localStorage.setItem('token', res.data.token);
                <Redirect to='/profile' component={Profile} />;
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
                name='email'
                placeholder='Example@mail.com '
                type='email'
              />
              <ErrorMessage
                component='div'
                className={style.errorMsg}
                name='email'
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

            <button className={style.submitBtn} type='submit'>
              Sign in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SignInForm;
