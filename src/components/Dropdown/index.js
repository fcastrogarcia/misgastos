import React from "react";
import cx from "classnames";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ items, style }) => {
  return (
    <div className={cx(styles.dropdown, style)}>
      <ul className={styles.ul}>
        {items.map((item, index) => (
          <li className={styles.li} key={index} onClick={item.clickHandler}>
            {item.icon(styles)}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
