import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { newUserSchema } from "../../utils/validationSchemas";
import style from "./Form.module.sass";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, setUsersError } from "../../redux/Users/usersActions";

export default function SignUpForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.users.error);

  useEffect(() => {
    return () => {
      dispatch(setUsersError(""));
    };
  }, []);

  return (
    <div className={style.formContainer}>
      <Formik
        initialValues={{
          name: "",
          password: "",
          email: "",
        }}
        validationSchema={newUserSchema}
        onSubmit={async (values, actions) => {
          dispatch(addNewUser(values, history));
          actions.resetForm();
        }}
      >
        <Form className={style.formWrapper}>
          <div className={style.formSection}>
            <Field
              className={style.inputField}
              name="name"
              placeholder="Name"
              type="text"
            />
            <ErrorMessage
              component="div"
              className={style.errorMsg}
              name="name"
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

          <div className={style.formSection}>
            <Field
              className={style.inputField}
              name="email"
              placeholder="example@mail.to"
              type="email"
            />
            <ErrorMessage
              component="div"
              className={style.errorMsg}
              name="email"
            />
          </div>
          <div className={style.errorMsg}>{errorMessage}</div>
          <button className={style.submitBtn} type="submit">
            Sign up
          </button>
        </Form>
      </Formik>
    </div>
  );
}
