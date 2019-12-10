import React from "react";
import styles from "./Layout.module.scss";
import cx from "classnames";

export default ({ children }) => (
  <div className={cx(styles.layout)}>{children}</div>
);
