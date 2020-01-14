import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";

import useSubmitForm from "./useSubmitForm";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "./DueDate";
import Amount from "./Amount";
import SubmitButton from "../shared/SubmitButton";

const Form = ({ initialState }) => {
  const [payment, setPayment] = useState(initialState);

  const submit = useSubmitForm(payment);

  const { handleSubmit, isLoading, errors, doValidateInput } = submit;
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
  console.log(errors);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="section-heading">Registrá un nuevo pago</h1>
      <PaymentType setPayment={setPayment} payment={payment} />
      <AutomaticPayment
        setPayment={updatePayment}
        isChecked={automatic_payment}
      />
      <Category
        setPayment={updatePayment}
        payment={payment}
        doValidateInput={doValidateInput}
        errors={errors}
      />
      {single_payment && <DueDate setPayment={updatePayment} date={due_date} />}
      <Amount
        setPayment={updatePayment}
        amount={amount}
        doValidateInput={doValidateInput}
        errors={errors}
      />
      <SubmitButton isLoading={isLoading} text={"Guardar"} />
    </form>
  );
};

export default Form;
