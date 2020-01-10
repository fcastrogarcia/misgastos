import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Link,
  Redirect
} from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import Payments from "./Payments";
import Modal from "../../components/Dashboard/Modal/index";

const Main = () => {
  return (
    <Router>
      <Layout>
        <Route path="/main/overview" component={Payments} />
        <Route path="/main/payments" component={Payments} />
        <Route path="/main/expenses" component={Payments} />
        <Route path="/main/budget" component={Payments} />
        <Modal />
        <Route
          exact
          path="/main"
          render={() => <Redirect to="/main/payments" />}
        />
      </Layout>
    </Router>
  );
};

export default Main;
