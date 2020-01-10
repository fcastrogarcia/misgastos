import React, { useContext, useState } from "react";
import styles from "./Header-menu.module.scss";

import { MdKeyboardArrowDown } from "react-icons/md";
import authContext from "../Context/authContext";
import Dropdown from "./Header-dropdown";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(authContext);

  return (
    <div className={styles.wrapper} onClick={() => setOpen(!open)}>
      <MdKeyboardArrowDown className={styles.caret} />
      <p className={styles.username}>{auth.displayName}</p>
      <img className={styles.photo} src={auth.photoURL} alt="user" />
      {open && <Dropdown />}
    </div>
  );
};

export default Menu;
