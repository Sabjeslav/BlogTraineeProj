import React from "react";
import style from "./EditProfileForm.module.sass";
import { useDispatch, useSelector } from "react-redux";
import imgPlaceholder from "../../img/avatar-placeholder.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  toggleIsEditing,
  updateUser,
} from "../../redux/CurrentUser/currentUserActions";

export default function EditProfileForm() {
  const userState = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const cancelHandler = () => {
    return dispatch(toggleIsEditing());
  };
  return (
    <Formik
      initialValues={{
        name: userState.user.name,
      }}
      // validationSchema={newUserSchema}
      onSubmit={(values) => {
        dispatch(updateUser(userState.user._id, values));
        dispatch(toggleIsEditing());
      }}
    >
      <Form className={style.profileWrapper}>
        <div className={style.profileHeader}>Edit Profile</div>
        <div className={style.profileContainer}>
          <div className={style.profileData}>
            <div className={style.profileRow}>
              <label htmlFor="name" className={style.rowCaption}>
                Name:
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Name"
                className={style.rowContent}
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className={style.profileRow}>
              <button className={style.actionBtn} type="submit">
                Submit
              </button>
              <button
                className={style.actionBtn}
                onClick={cancelHandler}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className={style.profileData}>
            <div className={style.imgContainer}>
              <img
                className={style.profileImg}
                alt=""
                src={`https://nodejs-test-api-blog.herokuapp.com${userState.user.avatar}`}
                onError={(e) => {
                  e.target.src = imgPlaceholder;
                }}
              />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
