import React from "react";
import styles from "./Navigation.module.scss";
import { useHistory, useRouteMatch } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

const paths = [
  "/main/new-payment",
  "/main/new-expense",
  "/main/edit-payment/:id"
];

const Navigation = () => {
  const history = useHistory();
  const match = useRouteMatch(paths);

  function goBack(e) {
    e.preventDefault();
    history.goBack();
  }

  return (
    match && (
      <button className={styles.navigation} onClick={goBack}>
        <IoIosArrowBack className={styles.arrow} />
      </button>
    )
  );
};

export default Navigation;
