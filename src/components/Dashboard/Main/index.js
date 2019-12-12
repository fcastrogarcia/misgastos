import React, { useState } from "react";
import styles from "./Main.module.scss";

export default () => {
  return (
    <React.Fragment>
      <main>
        <h2 className={styles.month}>Diciembre</h2>
        <ul>
          <li className={styles.item}>Internet</li>
          <li className={styles.item}>Gas</li>
          <li className={styles.item}>Celular</li>
        </ul>
      </main>
    </React.Fragment>
  );
};
