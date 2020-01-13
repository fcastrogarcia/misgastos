import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";

import useHandleSubmit from "./useHandleSubmit";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "./DueDate";
import Amount from "./Amount";
import SubmitButton from "../shared/SubmitButton";

const Form = ({ initialState }) => {
  const [payment, setPayment] = useState(initialState);
  const { handleSubmit, isLoading } = useHandleSubmit(payment);

  const { single_payment, due_date, automatic_payment, amount } = payment;

  useEffect(() => {
    setPayment(initialState);
    console.log("useEffect from Form. If this prints too much call a lawyer");
  }, [initialState]);

  function updatePayment(newData) {
    setPayment(prevState => {
      return {
        ...prevState,
        ...newData
      };
    });
  }

  console.log(payment);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="section-heading">Registrá un nuevo pago</h1>
      <PaymentType setPayment={setPayment} payment={payment} />
      <AutomaticPayment
        setPayment={updatePayment}
        isChecked={automatic_payment}
      />
      <Category setPayment={updatePayment} payment={payment} />
      {single_payment && <DueDate setPayment={updatePayment} date={due_date} />}

      <Amount setPayment={updatePayment} amount={amount} />
      <SubmitButton isLoading={isLoading} text={"Guardar"} />
    </form>
  );
};

export default Form;
