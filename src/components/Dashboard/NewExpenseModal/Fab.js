import React from "react";
import styles from "./Fab.module.scss";

export default ({ open, modalToggler }) => {
  return (
    <button
      className={styles.floatingActionButton}
      onClick={() => modalToggler(!open)}
    >
      +
    </button>
  );
};
