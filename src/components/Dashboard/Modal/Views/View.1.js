import React from "react";
import styles from "./View.module.scss";
import cn from "classnames";

export default ({ setPayment, setIndex }) => {
  let singlePayment;

  function handleClick(_, singlePayment) {
    setPayment(prevState => {
      return {
        ...prevState,
        single_payment: singlePayment
      };
    });
    setIndex(1);
  }

  return (
    <div className={styles["full-space-container"]}>
      <h3 className={styles.title}>Seleccioná una opción</h3>
      <div className={styles["wrapper-margin-top"]}>
        <button
          className={styles["main-action-button"]}
          onClick={e => handleClick(e, (singlePayment = false))}
        >
          Servicio / Pago mensual
        </button>
        <button
          className={styles["main-action-button"]}
          onClick={e => handleClick(e, (singlePayment = true))}
        >
          Pago único
        </button>
      </div>
    </div>
  );
};
