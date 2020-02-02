import React from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import Payments from "./Payments";
import NewPayment from "./NewPayment";
import EditPayment from "./EditPayment";
import { Provider as PaymentsProvider } from "../../context/PaymentsContext";

const Main = () => {
  return (
    <Router>
      <Layout>
        <Route path="/main/overview" component={Payments} />
        <Route path="/main/expenses" component={Payments} />
        <Route path="/main/budget" component={Payments} />
        <PaymentsProvider>
          <Route path="/main/payments" component={Payments} />
          <Route path="/main/new-payment" component={NewPayment} />
          <Route path="/main/edit-payment/:id" component={EditPayment} />
        </PaymentsProvider>
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
