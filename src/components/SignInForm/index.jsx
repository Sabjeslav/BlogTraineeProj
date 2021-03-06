import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import style from "./SignInForm.module.sass";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, setError } from "../../redux/CurrentUser/currentUserActions";

export default function SignInForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const errorMessage = useSelector((state) => state.user.error);

  useEffect(() => {
    return () => {
      dispatch(setError(""));
    };
  }, []);

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
            dispatch(logIn(values, history));
            actions.resetForm();
          }}
        >
          <Form
            className={style.formWrapper}
            onChange={() => dispatch(setError(null))}
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
