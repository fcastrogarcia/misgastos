import React from "react";
import styles from "./CreateButton.module.scss";

import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const CreateButton = ({ path = "", text = "" }) => {
  return (
    <Link to={path} className={styles["create-button"]}>
      <MdAdd className={styles.icon} />
      <p className={styles.text}>{text}</p>
    </Link>
  );
};

export default CreateButton;
