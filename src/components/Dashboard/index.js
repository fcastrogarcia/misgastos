import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import firebaseContext from "../Firebase/context";
import authContext from "../Auth/context";
import Loader from "../shared/Loader";

const wrapper = {
  width: "100vw",
  height: "100vh",
  maxHeight: "100%",
  maxWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const Dashboard = ({ history }) => {
  const firebase = useContext(firebaseContext);
  const { auth } = useContext(authContext);

  function logOut() {
    firebase
      .signOut()
      .then(() => history.push("/signin"))
      .catch(err => console.log(err));
  }
  console.log("auth from dashboard: ", auth);

  return auth === "loading" ? (
    <Loader loading={auth} />
  ) : !auth ? (
    <Redirect to="/signin" />
  ) : (
    <React.Fragment>
      <div style={wrapper}>
        <h2>Dashboard</h2>
        <button onClick={logOut}>Sign out</button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Dashboard);
