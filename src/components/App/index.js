import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import SignIn from "../SignIn/index";
// import SignUp from "../SignUp/index";
import Dashboard from "../Dashboard/index";
import PrivateRoute from "./PrivateRoute";
import authContext from "../Auth/context";
import "../../styles/index";

export default () => {
  const { auth } = useContext(authContext);
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signin" />} />
          <Route exact path="/signin" component={SignIn} />
          {/* <Route exact path="/signup" component={SignUp} /> */}
          <PrivateRoute
            exact
            path="/dashboard"
            auth={auth}
            component={Dashboard}
          />
          <Route render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
