import React from "react";
import styles from "./Layout.module.scss";
import cx from "classnames";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default ({ children }) => (
  <div className={cx(styles.layout, styles.grid)}>
    <Header />
    <Sidebar />
    <main>{children}</main>
  </div>
);
