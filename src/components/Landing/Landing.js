import React from "react";
import styles from "./Landing.module.scss";

export default ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.presentation}>holña</div>
    {children}
  </div>
);
