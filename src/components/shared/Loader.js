import React from "react";
import styles from "./Layout.module.scss";
import { RotateLoader } from "react-spinners";

export default ({ loading }) => (
  <div className={styles.layout}>
    <RotateLoader size={55} loading={loading} color={"#4FD1C5"} />
  </div>
);
