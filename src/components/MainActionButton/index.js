import React from "react";
import styles from "./MainActionButton.module.scss";
import { string } from "prop-types";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const MainActionButton = ({ path, text }) => {
  return (
    <Link to={path} className={styles.button}>
      <MdAdd className={styles.icon} />
      <p className={styles.text}>{text}</p>
    </Link>
  );
};

MainActionButton.propTypes = {
  path: string,
  text: string
};

MainActionButton.defaultProps = {
  path: "",
  text: ""
};

export default MainActionButton;
