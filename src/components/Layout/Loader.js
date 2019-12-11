import React from "react";
import styles from "./Layout.module.scss";
import cx from "classnames";
import { RotateLoader } from "react-spinners";

export default ({ loading }) => {
  const { layout, flex } = styles;

  return (
    <div className={cx(layout, flex)}>
      <RotateLoader size={18} loading={loading} color={"#4FD1C5"} />
    </div>
  );
};
