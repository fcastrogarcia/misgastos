import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import SignIn from "../SignIn";
import Main from "../../pages/Main";
import PrivateRoute from "./PrivateRoute";
import authContext from "../../context/authContext";
import Loader from "../Layout/Loader";

import "../../styles/index";
import "../../assets/font-icon/style.css";

const homeInRouting = auth =>
  auth === "loading" ? (
    <Loader />
  ) : auth ? (
    <Redirect to="/main" />
  ) : (
    <Redirect to="/signin" />
  );

const signInRouting = auth =>
  auth === "loading" ? <Loader /> : auth ? <Redirect to="/main" /> : <SignIn />;

export default () => {
  const { auth } = useContext(authContext);
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={() => homeInRouting(auth)} />
          <Route exact path="/signin" render={() => signInRouting(auth)} />
          <PrivateRoute path="/main" auth={auth} component={Main} />
          <Route render={() => <Redirect to="/main" />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
