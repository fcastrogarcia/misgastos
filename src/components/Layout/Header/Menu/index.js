import React, { useContext, useState } from "react";
import styles from "./Menu.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import authContext from "../../../Auth/context";
import Dropdown from "./Dropdown";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(authContext);
  console.log(open);

  return (
    <div className={styles.wrapper} onClick={() => setOpen(!open)}>
      <MdKeyboardArrowDown className={styles.caret} />
      <p className={styles.username}>{auth.displayName}</p>
      <img className={styles.photo} src={auth.photoURL} />
      {open && <Dropdown />}
    </div>
  );
};

export default Menu;
