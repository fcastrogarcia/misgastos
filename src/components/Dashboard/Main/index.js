import React, { useState } from "react";
import styles from "./Main.module.scss";
import SettingsBar from "../SettingsBar/index";
import Fab from "../NewExpenseModal/Fab";
import NewExpenseModal from "../NewExpenseModal/index";

export default () => {
  const [open, setOpen] = useState(true);
  console.log(open);
  return (
    <React.Fragment>
      <main>
        <SettingsBar />
        <div className={styles.container}>
          <h2 className={styles.month}>Diciembre</h2>
          <ul>
            <li className={styles.item}>Internet</li>
            <li className={styles.item}>Gas</li>
            <li className={styles.item}>Celular</li>
          </ul>
        </div>
      </main>
      <Fab open={open} modalToggler={setOpen} />
      <NewExpenseModal open={open} setOpen={setOpen} />
    </React.Fragment>
  );
};
