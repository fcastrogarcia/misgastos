import React, { useState } from "react";
import styles from "./View.module.scss";
import NumberFormat from "react-number-format";
import Navigation from "./Navigation";
import { FaCheck } from "react-icons/fa";

export default ({ setPayment, setOpen, setIndex }) => {
  const [amount, setAmount] = useState(0);

  function handleChange(e) {
    setAmount(e.floatValue);
  }

  function handleSubmit() {
    if (amount) {
      setPayment(prevState => {
        return {
          ...prevState,
          amount: amount
        };
      });
      setOpen(false);
    }
  }

  return (
    <div className={styles["full-space-container"]}>
      <div>
        <h3 className={styles.title}>¿Cuánto tenés que pagar?</h3>
        <p>(opcional)</p>
        <NumberFormat
          className={styles["input"]}
          prefix={"$"}
          allowNegative={false}
          onValueChange={handleChange}
        />
      </div>
      <Navigation
        handleBackward={() => setIndex(2)}
        handleForward={handleSubmit}
        rightIcon={<FaCheck />}
      />
    </div>
  );
};
