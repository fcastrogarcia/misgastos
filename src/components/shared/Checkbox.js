import React from "react";
import cx from "classnames";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ handleChange, isChecked, text }) => {

  return (
    <label className={styles["label"]}>
      <input type="checkbox" onChange={handleChange} />
      <span
        className={cx(styles.checkbox, {
          [styles["checkbox--checked"]]: isChecked
        })}
      ></span>
      <p className={styles.text}>{text}</p>
    </label>
  );
};

export default Checkbox;

