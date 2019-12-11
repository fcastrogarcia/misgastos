import React from "react";
import styles from "./Layout.module.scss";
import cx from "classnames";
import Header from "./Header/index";

export default ({ children }) => (
  <div className={cx(styles.layout)}>
    <Header />
    {children}
  </div>
);
