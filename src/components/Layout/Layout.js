import React, { useState } from "react";
import styles from "./Layout.module.scss";
import cx from "classnames";

import Header from "../Header";
import Sidebar from "./Sidebar";

export default ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cx(styles.layout, styles.grid)}>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};
