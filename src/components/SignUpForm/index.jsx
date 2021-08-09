import React from 'react';
import style from './AuthForm.module.sass';
import LoginForm from './Form';

function SignUpForm () {
  return (
    <div className={style.authWrapper}>
      <div className={style.title}>Sign up </div>
      <LoginForm />
    </div>
  );
}

export default SignUpForm;
