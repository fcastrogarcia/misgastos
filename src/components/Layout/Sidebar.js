import React from "react";
import cx from "classnames";
import styles from "./Sidebar.module.scss";

const sections = ["Overview", "Payments", "Expenses", "Budget"];

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
    </aside>
  );
};
