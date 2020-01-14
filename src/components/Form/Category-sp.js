import React from "react";
import cx from "classnames";
import styles from "../../styles/inputs.module.scss";

export default ({ errors, handleChange }) => (
  <input
    className={cx(styles.input, { [styles.error]: errors.category })}
    name="category"
    type="text"
    autoComplete="off"
    onChange={handleChange}
  ></input>
);
