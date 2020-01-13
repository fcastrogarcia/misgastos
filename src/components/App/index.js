import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

// import SignUp from "../SignUp/index";

import SignIn from "../SignIn/index";
import Main from "../../pages/Main/index";
import PrivateRoute from "./PrivateRoute";
import authContext from "../Context/authContext";

import "../../styles/index";
import "../../assets/font-icon/style.css";

export default () => {
  const { auth } = useContext(authContext);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signin" />} />
          <Route exact path="/signin" component={SignIn} />
          {/* <Route exact path="/signup" component={SignUp} /> */}
          <PrivateRoute path="/main" auth={auth} component={Main} />
          <Route render={() => <Redirect to="/main" />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
