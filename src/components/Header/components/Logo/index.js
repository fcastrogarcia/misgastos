import React from "react";
import styles from "./Logo.module.scss";

import Hamburger from "../Hamburger";

const Logo = props => (
  <div className={styles.logo}>
    <Hamburger {...props} />
  </div>
);

export default Logo;
