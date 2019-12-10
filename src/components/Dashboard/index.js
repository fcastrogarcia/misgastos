import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import authContext from "../Auth/context";
import Dashboard from "./Dashboard";
import Loader from "../shared/Loader";

const ProtectedDashboard = () => {
  const { auth } = useContext(authContext);
  console.log(auth)
  return auth === "loading" ? (
    <Loader loading={auth} />
  ) : !auth ? (
    <Redirect to="/signin" />
  ) : (
    <Dashboard />
  );
};

export default ProtectedDashboard;
