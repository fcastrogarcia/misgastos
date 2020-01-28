import React from "react";
import styles from "./SelectedMonth.module.scss";

import usePayments from "./usePayments";

const SelectedMonth = () => {
  const { time } = usePayments();

  const doMaskMonth = month => (month < 10 ? `0${month + 1}` : month + 1);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.month}>{doMaskMonth(time.month)}</h3>
      <h3 className={styles.year}> / {time.year}</h3>
    </div>
  );
};

export default SelectedMonth;
