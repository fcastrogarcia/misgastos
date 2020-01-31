import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";

import useSubmitForm from "./useSubmitForm";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "../shared/DatePicker";
import Amount from "../shared/AmountInput";
import SubmitButton from "../shared/SubmitButton";

const Form = ({ initialState }) => {
  const [payment, setPayment] = useState(initialState);

  const submit = useSubmitForm(payment);

  const { handleSubmit, isLoading, errors, doValidateInput } = submit;
  const { single_payment, due_date, automatic_payment, amount } = payment;

  useEffect(() => {
    setPayment(initialState);
  }, [initialState]);

  function updatePayment(newData) {
    setPayment(prevState => {
      return {
        ...prevState,
        ...newData
      };
    });
  }

  function handleDueDateChange(date) {
    const newData = { due_date: date };
    updatePayment(newData);
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
      <Category
        setPayment={updatePayment}
        payment={payment}
        doValidateInput={doValidateInput}
        errors={errors}
      />
      {single_payment && (
        <div>
          <h3 className="section-subheading">
            Agendá el vencimiento (opcional)
          </h3>
          <DueDate date={due_date} handleChange={handleDueDateChange} />
        </div>
      )}
      <div>
        <h3 className="section-subheading">Ingresá el monto</h3>
        <Amount
          setter={updatePayment}
          amount={amount}
          doValidateInput={doValidateInput}
          error={errors.amount}
        />
      </div>
      <SubmitButton isLoading={isLoading} text="Guardar" />
    </form>
  );
};

export default Form;
