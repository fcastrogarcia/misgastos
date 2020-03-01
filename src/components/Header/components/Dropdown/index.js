import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import Dropdown from "../../../Dropdown";
import { MdExitToApp } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";

import firebaseContext from "../../../../context/firebaseContext";

const Menu = ({ history }) => {
  const firebase = useContext(firebaseContext);

  function logOut() {
    firebase.signOut().finally(() => history.push("/signin"));
  }

  const items = [
    {
      label: "Profile",
      icon: styles => <FaUserCog className={styles.icon} />,
      clickHandler: null
    },
    {
      label: "Log Out",
      icon: styles => <MdExitToApp className={styles.icon} />,
      clickHandler: logOut
    }
  ];

  return <Dropdown items={items} />;
};

export default withRouter(Menu);
