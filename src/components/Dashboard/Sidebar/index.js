import React from "react";
import styles from "./Sidebar.module.scss";
import keyGen from "../../../utils/keyGen";

const sections = ["Overview", "Payments", "Expenses", "Budget"];

export default ({ setSection }) => {
  return (
    <aside>
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
