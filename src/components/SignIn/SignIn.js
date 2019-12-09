import React from "react";
import { FaGoogle } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import styles from "./signIn.module.scss";

export default ({ clickHandler }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Keep account of your expenses.</h1>
    <button
      className={styles.button}
      onClick={clickHandler}
      arial-labelledby="google sign in"
    >
      Sign In with {"  "}
      <FaGoogle />
    </button>
  </div>
);
