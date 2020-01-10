import React from "react";
import styles from "./Header-navigation.module.scss";
import { useHistory, useLocation } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

const paths = ["/main/new-payment", "/main/new-expense"];

const Navigation = () => {
  const history = useHistory();
  const location = useLocation();

  const shouldRender = paths.some(path => path === location.pathname);

  function goBack(e) {
    e.preventDefault();
    history.goBack();
  }

  return (
    shouldRender && (
      <button className={styles.navigation} onClick={goBack}>
        <IoIosArrowBack className={styles.arrow} />
      </button>
    )
  );
};

export default Navigation;
