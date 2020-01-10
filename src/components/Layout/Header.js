import React from "react";
import styles from "./Header.module.scss";

import Navigation from "./Header-navigation";
import Menu from "./Header-menu";

const Header = () => (
  <header>
    <Navigation />
    <Menu />
  </header>
);

export default Header;
