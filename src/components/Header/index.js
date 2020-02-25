import React from "react";
import styles from "./Header.module.scss";

import Navigation from "./components/Navigation";
import Menu from "./components/Menu";
import Logo from "./components/Logo";

const Header = props => (
  <React.Fragment>
    <Logo {...props} />
    <header>
      <Navigation />
      <Menu />
    </header>
  </React.Fragment>
);

export default Header;
