import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "../shared/DatePicker";
import Amount from "../shared/AmountInput";
import SubmitButton from "../SubmitButton";

import useSubmitForm from "./useSubmitForm";
import { getTimestampFromDate } from "../../utils/time";

const Form = ({ initialState, title }) => {
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
    const newData = { due_date: getTimestampFromDate(date) };
    updatePayment(newData);
  }
  console.log(payment);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className="section-heading">{title}</h1>
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
        <h3 className="section-subheading">
          {single_payment ? "Ingresá el monto" : "Ingresá el monto inicial"}
        </h3>
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
