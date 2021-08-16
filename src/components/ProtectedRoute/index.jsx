import React from "react";
import { Redirect, Route } from "react-router-dom";

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
