import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.token) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/forbidden",
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
