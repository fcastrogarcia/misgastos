import React from "react";
import styles from "./Table.module.scss";
import { css } from "@emotion/core";

import { SkewLoader } from "react-spinners";

const loaderOverride = css`
  text-align: center;
  margin: 2rem 0;
`;

const Loader = () => {
  return (
    <td colSpan="5">
      <div className={styles["loader-wrapper"]}>
        <SkewLoader css={loaderOverride} color={"#38b2ac"} size={13} />
      </div>
    </td>
  );
};

export default Loader;
