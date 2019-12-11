import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Dropdown.module.scss";
import { MdExitToApp } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import firebaseContext from "../../../Firebase/context";

const Dropdown = ({ history }) => {
  const firebase = useContext(firebaseContext);

  function logOut() {
    firebase
      .signOut()
      .then(() => history.push("/signin"))
      .catch(err => console.log(err));
  }

  return (
    <div className={styles.dropdown}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <FaUserCog className={styles.icon} />
          <p>Profile</p>
        </li>
        <li className={styles.li}>
          <MdExitToApp className={styles.icon} />
          <button onClick={logOut}>Log Out</button>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Dropdown);
