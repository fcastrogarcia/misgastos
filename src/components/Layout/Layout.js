import React from "react";
import styles from "./Layout.module.scss";
import cx from "classnames";

import Header from "../Header";
import Sidebar from "./Sidebar";
import Logo from "./Logo";

export default ({ children }) => (
  <div className={cx(styles.layout, styles.grid)}>
    <Logo />
    <Header />
    <Sidebar />
    <main>{children}</main>
  </div>
);
