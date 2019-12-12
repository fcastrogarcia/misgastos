import React from "react";
import styles from "./Fab.module.scss";

export default ({ open, setOpen, setPayment, setIndex }) => {
  function handleClick() {
    const defaultState = {
      single_payment: null,
      category: null,
      provider: null,
      due_date: null,
      amount: null,
      months_paid: []
    };
    setPayment(defaultState);
    setIndex(0);
    setOpen(!open);
  }
  return (
    <button className={styles.floatingActionButton} onClick={handleClick}>
      +
    </button>
  );
};
