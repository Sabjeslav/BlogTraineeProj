import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import style from "./SignInForm.module.sass";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signIn } from "../../helpers";

export default function SignInForm() {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <div className={style.wrapper}>
      <h1>Sign in</h1>
      <div className={style.formContainer}>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (values, actions) => {
            await signIn(values, history, setErrorMessage);
            actions.resetForm();
          }}
        >
          <Form
            className={style.formWrapper}
            onChange={() => setErrorMessage(null)}
          >
            <div className={style.formSection}>
              <Field
                className={style.inputField}
                name="email"
                placeholder="Example@mail.com "
                type="email"
              />
              <ErrorMessage
                component="div"
                className={style.errorMsg}
                name="email"
              />
            </div>
            <div className={style.formSection}>
              <Field
                className={style.inputField}
                name="password"
                placeholder="Password"
                type="password"
              />
              <ErrorMessage
                component="div"
                className={style.errorMsg}
                name="password"
              />
            </div>

            <div className={style.errorMsg}>{errorMessage}</div>

            <div className={style.signUpLink}>
              <Link to="/signUp">Don't have an account? Let's create it</Link>
            </div>

            <button className={style.submitBtn} type="submit">
              Sign in
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
