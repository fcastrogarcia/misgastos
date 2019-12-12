import React, { useState } from "react";
import styles from "./Main.module.scss";
import SettingsBar from "../SettingsBar/index";
import Fab from "../NewExpenseModal/Fab";
import NewPaymentModal from "../NewExpenseModal/index";

export default () => {
  const initialState = {
    single_payment: null,
    category: null,
    provider: null,
    due_date: null,
    amount: null,
    months_paid: []
  };
  const [payment, setPayment] = useState(initialState);
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(1);

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
      <Fab
        open={open}
        modalToggler={setOpen}
        setPayment={setPayment}
        setIndex={setIndex}
      />
      <NewPaymentModal
        {...{ open, setOpen, payment, setPayment, index, setIndex }}
      />
    </React.Fragment>
  );
};
