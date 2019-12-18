import React from "react";
import cx from "classnames";
import styles from "../View.module.scss";

export default ({ error, handleChange }) => (
  <div className={styles["half-width-wrapper"]}>
    <h3 className={styles.title}>¿Qué tenés que pagar?</h3>
    <input
      className={cx(styles.input, { [styles.error]: error })}
      name="category"
      type="text"
      autoComplete="off"
      onChange={handleChange}
    ></input>
  </div>
);
