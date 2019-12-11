import React from "react";
import styles from "./Header.module.scss";
import { MdAttachMoney } from "react-icons/md";
import Menu from "./Menu/index";

const Header = () => (
  <header>
    <MdAttachMoney className={styles.logo} />
    <Menu />
  </header>
);

export default Header;
