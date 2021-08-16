import React from "react";
import User from "../../components/User";
import Spinner from "../../components/Spinner";
import style from "./Users.module.sass";
import { useSelector } from "react-redux";

export default function UsersPage() {
  const usersArray = useSelector(({ users }) => users);
  if (usersArray.isFetching) {
    return <Spinner />;
  }
  return (
    <div className={style.usersWrapper}>
      <div>
        <span className={style.columnHeader}>Name</span>
        <span className={style.columnHeader}>Email</span>
      </div>
      {usersArray.users.map((user) => {
        return <User key={user._id} user={user} />;
      })}
    </div>
  );
}
