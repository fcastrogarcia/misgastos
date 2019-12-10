import React, { useContext } from "react";
import firebaseContext from "../Firebase/context";
import { withRouter } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import Header from "./Header/index";

const Dashboard = ({ history }) => {
  const firebase = useContext(firebaseContext);

  function logOut() {
    firebase
      .signOut()
      .then(() => history.push("/signin"))
      .catch(err => console.log(err));
  }
  return (
    <React.Fragment>
      <Header />
      <button onClick={logOut} className={styles.button}>
        Sign out
      </button>
    </React.Fragment>
  );
};

export default withRouter(Dashboard);
