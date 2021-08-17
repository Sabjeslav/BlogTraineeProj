import React from "react";
import User from "../../components/User";
import Spinner from "../../components/Spinner";
import styles from "./Users.module.sass";
import { useSelector } from "react-redux";

export default function UsersPage() {
  const usersState = useSelector((state) => state.users);
  if (usersState.isFetching) {
    return <Spinner />;
  }

  return (
    <div className={styles.usersWrapper}>
      <div>
        <span className={styles.columnHeader}>Name</span>
        <span className={styles.columnHeader}>Email</span>
      </div>
      {usersState.users.map((user) => {
        return <User key={user._id} user={user} />;
      })}
    </div>
  );
}
