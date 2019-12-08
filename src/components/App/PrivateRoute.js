import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, auth, ...rest }) => {
  console.log("auth from private route: ", auth);
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin"
            }}
          />
        )
      }
    />
  );
};
