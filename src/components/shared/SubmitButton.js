import React from "react";
import cx from "classnames";
import styles from "./SubmitButton.module.scss";

import { BeatLoader } from "react-spinners";

const SubmitButton = ({ isLoading, text = "", style }) => (
  <div className={style}>
    <button
      className={cx(styles["main-action-button"], {
        [styles.loading]: isLoading
      })}
      type="submit"
    >
      {isLoading ? <BeatLoader size={9} color={"#81e6d9"} /> : text}
    </button>
  </div>
);

export default SubmitButton;
