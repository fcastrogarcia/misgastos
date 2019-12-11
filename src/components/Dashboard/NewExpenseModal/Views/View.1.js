import React from "react";
import styles from "./View.module.scss";
import cn from "classnames";

export default ({ setIndex, setExpense }) => {
  function handleClick(event) {
    const { singlePayment } = event.target.dataset;
    setExpense(prevState => {
      return { ...prevState, singlePayment: singlePayment };
    });
    setIndex(1);
  }

  return (
    <div className={styles.view}>
      <h3>Elegí el tipo de gasto</h3>
      <button
        className={styles.button}
        data-single-payment={false}
        onClick={handleClick}
      >
        Servicio
      </button>
      <button
        className={styles.button}
        data-single-payment={true}
        onClick={handleClick}
      >
        Pago único
      </button>
    </div>
  );
};
