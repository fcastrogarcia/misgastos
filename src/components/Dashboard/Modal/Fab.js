import React from "react";
import cx from "classnames";
import styles from "./Fab.module.scss";
import { MdAdd } from "react-icons/md";

export default ({ open, setOpen }) => {
  return (
    <button
      className={cx(styles.floatingActionButton, { [styles.open]: open })}
      onClick={() => setOpen(!open)}
    >
      <MdAdd className={cx(styles.icon, { [styles.open]: open })} />
    </button>
  );
};
