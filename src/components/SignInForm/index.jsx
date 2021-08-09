import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { loginSchema } from '../../utils/validationSchemas';
import style from './SignInForm.module.sass';
import { useHistory } from 'react-router';
import { USER_ACTION_TYPES } from '../../actions/actions';
import { Link } from 'react-router-dom';

const axios = require('axios');

function SignInForm (props) {
  const history = useHistory();
  const { postUser, toggleLogin } = props;
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
            axios
              .post('https://nodejs-test-api-blog.herokuapp.com/api/v1/auth', {
                email: values.email,
                password: values.password,
              })
              .then(res => {
                console.log('Logged');
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('isLogged', true);
                toggleLogin();
                history.push('/profile');
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

            <div className={style.signUpLink}>
              <Link to='/signUp'>Don't have an account? Let's create it</Link>
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch({ type: USER_ACTION_TYPES.GET_USER }),
    postUser: () => dispatch({ type: USER_ACTION_TYPES.POST_USER }),
    toggleLogin: () => dispatch({ type: USER_ACTION_TYPES.TOGGLE_LOGIN }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
