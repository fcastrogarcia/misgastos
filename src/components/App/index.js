import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import SignIn from "../SignIn/index";
import SignUp from "../SignUp/index";
import Dashboard from "../Dashboard/index";
import PrivateRoute from "../shared/PrivateRoute";

export default () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signin" />} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
