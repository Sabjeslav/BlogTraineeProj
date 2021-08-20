import React from "react";
import User from "../../components/User";
import Spinner from "../../components/Spinner";
import style from "./Users.module.sass";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";

export default function UsersPage() {
  const usersState = useSelector((state) => state.users);
  if (usersState.isFetching) {
    return <Spinner />;
  }

  return (
    <div className={style.usersWrapper}>
      <div>{usersState.error}</div>
      <div className={style.pageHeader}>
        <div className={style.columnHeader}>Name</div>
        <div className={style.columnHeader}>Email</div>
        <Autocomplete
          options={usersState.users}
          limitTags={1}
          getOptionLabel={(option) => (option.name ? option.name : "")}
          className={style.columnHeader}
          renderInput={(params) => (
            <TextField {...params} label="Type user name" variant="outlined" />
          )}
          renderOption={(option) => (
            <Link
              to={`/users/${option._id}`}
              params={{ user: option }}
              className={style.link}
            >
              {option.name}
            </Link>
          )}
        />
      </div>
      {usersState.users.map((user) => {
        return <User key={user._id} user={user} />;
      })}
    </div>
  );
}
