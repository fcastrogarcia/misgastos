import React from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from "../Layout/Loader";

export default ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return auth === "loading" ? (
          <Loader />
        ) : !auth ? (
          <Redirect
            to={{
              pathname: "/signin"
            }}
          />
        ) : (
          <Component />
        );
      }}
    />
  );
};
