import React from "react";
import { useHistory, useParams } from "react-router-dom";
import style from "./UserProfile.module.sass";
import { useDispatch, useSelector } from "react-redux";
import imgPlaceholder from "../../img/avatar-placeholder.png";
import Spinner from "../Spinner";
import { getAllPosts } from "../../redux/Posts/postsActions";

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { user } = useSelector(({ user }) => user);
  const usersState = useSelector((state) => state.users);
  const { id } = useParams();
  if (!usersState.loaded) {
    return <Spinner />;
  }
  if (id) {
    user = usersState.users.find((u) => u._id === id);
  }
  const showPosts = () => {
    dispatch(getAllPosts(user._id));
    history.push({
      pathname: "/posts",
      search: `?postedBy=${user._id}`,
    });
  };
  return (
    <div className={style.profileWrapper}>
      <div className={style.profileHeader}>Profile</div>
      <div className={style.profileContainer}>
        <div className={style.profileData}>
          <div className={style.profileRow}>
            <div className={style.rowCaption}>Name:</div>
            <div className={style.rowContent}>{user.name}</div>
          </div>
          <div className={style.profileRow}>
            <div className={style.rowCaption}>Email:</div>
            <div className={style.rowContent}>{user.email}</div>
          </div>
          <div className={style.profileRow}>
            <div className={style.rowCaption}>Creation date:</div>
            <div className={style.rowContent}>
              {new Date(user.dateCreated).toLocaleDateString()}
            </div>
          </div>
          <div className={style.profileRow}>
            <div className={style.rowContent}>
              <button onClick={showPosts} className={style.viewBtn}>
                View posts
              </button>
            </div>
          </div>
        </div>
        <div className={style.profileData}>
          <div className={style.imgContainer}>
            <img
              className={style.profileImg}
              alt=""
              src={`https://nodejs-test-api-blog.herokuapp.com/${user.avatar}`}
              onError={(e) => {
                e.target.src = imgPlaceholder;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
