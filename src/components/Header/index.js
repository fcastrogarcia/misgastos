import React from "react";
import styles from "./Header.module.scss";

import Navigation from "./components/Navigation";
import Menu from "./components/Menu";

const Header = () => (
  <header>
    <Navigation />
    <Menu />
  </header>
);

export default Header;
