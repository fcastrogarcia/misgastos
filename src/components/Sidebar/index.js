import React from "react";
import cx from "classnames";
import styles from "./Sidebar.module.scss";

import LogOut from "./components/LogOut";

const sections = ["Pagos", "Gastos", "Presupuesto"];

export default ({ open }) => {
  return (
    <aside className={cx(styles.sidebar, { [styles["--close"]]: !open })}>
      <ul>
        {sections.map((item, i) => (
          <li key={i} className={styles.li}>
            {item}
          </li>
        ))}
      </ul>
      <LogOut />
    </aside>
  );
};
