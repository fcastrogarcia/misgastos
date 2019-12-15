import React from "react";
import styles from "./Navigation.module.scss";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default ({ handleBackward, handleForward, rightIcon }) => (
  <React.Fragment>
    <button className={styles.prev} onClick={handleBackward}>
      <FaArrowLeft />
    </button>
    <button className={styles.next} onClick={handleForward}>
      {rightIcon ? rightIcon : <FaArrowRight />}
    </button>
  </React.Fragment>
);
