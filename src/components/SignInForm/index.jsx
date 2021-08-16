import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import style from "./SignInForm.module.sass";
import { useHistory } from "react-router";
import { USER_ACTION_TYPES } from "../../actions/actions";
import { Link } from "react-router-dom";
import { authUser } from "../../services/currentUser.service";

export default function SignInForm() {
  const dispatch = useDispatch();
  const history = useHistory();
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
            await authUser({
              email: values.email,
              password: values.password,
            })
              .then((res) => {
                localStorage.setItem("token", res.token);
                localStorage.setItem("isLogged", true);
                dispatch({ type: USER_ACTION_TYPES.TOGGLE_LOGIN });
                history.push("/profile");
              })
              .catch((err) => {
                console.error(err);
              });
            actions.resetForm();
          }}
        >
          <Form className={style.formWrapper}>
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
