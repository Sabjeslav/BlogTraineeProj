import React from "react";
import style from "./SignUpPage.module.sass";
import SignUpForm from "../../components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className={style.authWrapper}>
      <div className={style.title}>Sign up</div>
      <SignUpForm />
    </div>
  );
}
