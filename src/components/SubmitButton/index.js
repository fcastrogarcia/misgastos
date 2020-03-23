import React from "react";
import cx from "classnames";
import styles from "./SubmitButton.module.scss";
import { string, bool } from "prop-types";

import { BeatLoader } from "react-spinners";

const SubmitButton = ({ isLoading, text, style }) => (
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

SubmitButton.propTypes = {
  isLoading: bool,
  text: string
};

SubmitButton.defaultProps = {
  text: ""
};

export default SubmitButton;
