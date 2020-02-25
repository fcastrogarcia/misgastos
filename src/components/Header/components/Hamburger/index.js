import React from "react";
import cx from "classnames";
import styles from "./Hamburger.module.scss";

const Hamburger = ({ open, setOpen }) => {
  return (
    <div
      className={cx(styles["toggle-container"])}
      onClick={() => setOpen(!open)}
    >
      <div className={cx(styles.bar, { [styles.toggle]: open })}></div>
      <div className={cx(styles.bar, { [styles.toggle]: open })}></div>
      <div className={cx(styles.bar, { [styles.toggle]: open })}></div>
    </div>
  );
};

export default Hamburger;
