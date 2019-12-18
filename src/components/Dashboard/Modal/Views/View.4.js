import React, { useState } from "react";
import styles from "./View.module.scss";
import NumberFormat from "react-number-format";
import Navigation from "../Navigation";
import { FaCheck } from "react-icons/fa";
import useCombinedContexts from "../../../Context/useCombinedContexts";

export default ({ payment, setPayment, setOpen, setIndex }) => {
  const [amount, setAmount] = useState(0);
  const { firebase, auth } = useCombinedContexts();

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
    }
    firebase
      .payments()
      .add({
        ...payment,
        userId: auth.uid,
        createdAt: firebase.fieldValue.serverTimestamp()
      })
      .then(() => setOpen(false))
      .catch(err => console.log(err));
  }

  return (
    <div className={styles["full-space-container"]}>
      <div className={styles["half-width-wrapper"]}>
        <h3 className={styles["title-sm"]}>¿Cuánto tenés que pagar?</h3>
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
