import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "../shared/DatePicker";
import Amount from "../shared/AmountInput";
import SubmitButton from "../SubmitButton";

import useSubmitForm from "./useSubmitForm";
import {
  getTimestampFromDate,
  getMinDayOfMonth,
  getMaxDayOfMonth
} from "../../utils/time";

const Form = ({ initialState, title }) => {
  const [payment, setPayment] = useState(initialState);

  const submit = useSubmitForm(payment);

  const { handleSubmit, isLoading, errors, doValidateInput } = submit;
  const { due_date, automatic_payment, amount, single_payment } = payment;

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

  const currDate = new Date();
  const maxDate = getMaxDayOfMonth(currDate);
  const minDate = getMinDayOfMonth(currDate);

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
      <div>
        <h3 className="section-subheading">Agendá el vencimiento (opcional)</h3>
        <DueDate
          date={due_date}
          handleChange={handleDueDateChange}
          maxDate={!single_payment ? maxDate : null}
          minDate={!single_payment ? minDate : null}
        />
      </div>
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
