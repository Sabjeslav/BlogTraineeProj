import React, { useState, useEffect } from 'react';
import User from './User';
const axios = require('axios');

function Users () {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    axios
      .get('https://nodejs-test-api-blog.herokuapp.com/api/v1/users')
      .then(response => {
        setUsers(response.data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

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
