import React from "react";
import styles from "./MainActionButton.module.scss";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const MainActionButton = ({ path = "" }) => {
  return (
    <Link to={path} className={styles["main-action-button"]}>
      <MdAdd className={styles.icon} />
    </Link>
  );
};

export default MainActionButton;
