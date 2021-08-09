import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute ({ component: Component, ...rest }) {
  const isLogged = localStorage.getItem('isLogged');
  return (
    <Route
      {...rest}
      render={props => {
        if (isLogged) {
          return <Component {...rest} {...props} />;
        } else {
          console.log(isLogged);
          return (
            <Redirect
              to={{
                pathname: '/forbidden',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

const mapStateToProps = state => state;

// const mapDispatchToProps = dispatch => {
//   return {
//     getUser: () => dispatch({ type: USER_ACTION_TYPES.GET_USER }),
//     postUser: () => dispatch({ type: USER_ACTION_TYPES.POST_USER }),
//     toggleLogin: () => dispatch({ type: USER_ACTION_TYPES.TOGGLE_LOGIN }),
//   };
// };

export default connect(mapStateToProps)(ProtectedRoute);
