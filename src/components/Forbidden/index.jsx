import React from 'react';
import { Link } from 'react-router-dom';

function Forbidden () {
  return (
    <div>
      <div>
        <h1>Error 404. Access forbidden</h1>
      </div>
      <div>
        <Link to='/signIn'>Please log into account</Link>
      </div>
    </div>
  );
}

export default Forbidden;
