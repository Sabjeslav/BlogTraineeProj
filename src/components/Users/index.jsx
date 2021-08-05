import React, { useState, useEffect } from 'react';
import User from './User';
import Spinner from '../Spinner';
const axios = require('axios');

function Users () {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const getUsers = async () => {
    setIsFetching(true);
    axios
      .get('https://nodejs-test-api-blog.herokuapp.com/api/v1/users')
      .then(response => {
        setUsers(response.data);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div>
      <h1>User list</h1>
      {users.map(user => {
        return <User key={user._id} user={user} />;
      })}
    </div>
  );
}

export default Users;
