import React, { useState } from "react";
import styles from "./LogOut.module.scss";

import { MdExitToApp } from "react-icons/md";
import Modal from "../Modal";

const Menu = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <button className={styles.button} onClick={() => setOpen(!isOpen)}>
          <MdExitToApp className={styles.icon} />
        </button>
      </div>
      {isOpen && <Modal isOpen={isOpen} setOpen={setOpen} />}
    </React.Fragment>
  );
};

export default Menu;
