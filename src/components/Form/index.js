import React, { useState } from "react";
import styles from "./Form.module.scss";
import cx from "classnames";

import { useHistory } from "react-router-dom";
import useCombinedContexts from "../Context/useCombinedContexts";
import initialState from "./formInitialState";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "./DueDate";
import Amount from "./Amount";
import { BeatLoader } from "react-spinners";

const SubmitButton = ({ isLoading }) => (
  <div className={styles["submit-field"]}>
    <button
      className={cx("main-action-button", { loading: isLoading })}
      type="submit"
    >
      {isLoading ? <BeatLoader size={9} color={"#81e6d9"} /> : "Guardar"}
    </button>
  </div>
);

const Form = () => {
  const [payment, setPayment] = useState(initialState);
  const [isLoading, setLoading] = useState(false);
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
    setLoading(true);
    firebase
      .payments()
      .add({
        ...payment,
        userId: auth.uid,
        createdAt: firebase.fieldValue.serverTimestamp()
      })
      .then(() => setLoading(false))
      .then(() => history.push("/main/payments"))
      .catch(() => setLoading(false));
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
      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default Form;
