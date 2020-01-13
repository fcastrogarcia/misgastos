import React, { useState } from "react";
import styles from "./Form.module.scss";

import { useHistory } from "react-router-dom";
import useCombinedContexts from "../Context/useCombinedContexts";
import initialState from "./formInitialState";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "./DueDate";
import Amount from "./Amount";

const SubmitButton = () => (
  <div className={styles["submit-field"]}>
    <button className="main-action-button" type="submit">
      Guardar
    </button>
  </div>
);

const Form = () => {
  const [payment, setPayment] = useState(initialState);
  const { firebase, auth } = useCombinedContexts();
  const history = useHistory();

  const { single_payment, due_date, automatic_payment, amount } = payment;

  function updatePayment(newData) {
    setPayment(prevState => {
      return {
        ...prevState,
        ...newData
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .payments()
      .add({
        ...payment,
        userId: auth.uid,
        createdAt: firebase.fieldValue.serverTimestamp()
      })
      .then(() => history.push("/main/payments"))
      .catch(err => console.log(err));
  }

  console.log(payment);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles["main-title"]}>Registrá un nuevo pago</h1>
      <PaymentType setPayment={setPayment} payment={payment} />
      <AutomaticPayment
        setPayment={updatePayment}
        isChecked={automatic_payment}
      />
      <Category setPayment={updatePayment} payment={payment} />
      {single_payment && <DueDate setPayment={updatePayment} date={due_date} />}
      <Amount setPayment={updatePayment} amount={amount} />
      <SubmitButton />
    </form>
  );
};

export default Form;
