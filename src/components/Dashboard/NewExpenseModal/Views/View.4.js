import React, { useState } from "react";
import styles from "./View.module.scss";
import cn from "classnames";
import { FaArrowLeft } from "react-icons/fa";

export default ({ payment, setPayment, setOpen, setIndex }) => {
  const [amount, setAmount] = useState(null);

  function handleChange(e) {
    setAmount(e.target.value);
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
      setIndex(0);
    } else {
      alert("Ingresá el monto a pagar");
    }
  }
  return (
    <div className={styles.view}>
      <h3>¿Cuánto tenés que pagar?</h3>
      <p>(Ingresá un valor estimado en su defecto)</p>
      <input type="number" onChange={handleChange} />
      <button className={styles.prev} onClick={() => setIndex(2)}>
        <FaArrowLeft />
      </button>
      <button className={styles.next} onClick={handleSubmit}>
        OK
      </button>
    </div>
  );
};
