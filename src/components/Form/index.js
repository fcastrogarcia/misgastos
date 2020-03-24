import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";

import PaymentType from "./PaymentType";
import AutomaticPayment from "./AutomaticPayment";
import Category from "./Category";
import DueDate from "../shared/DatePicker";
import Amount from "./Amount";
import SubmitButton from "../SubmitButton";

import useSubmitForm from "./useSubmitForm";
import {
  getTimestampFromDate,
  getMinDayOfMonth,
  getMaxDayOfMonth,
  getMonthAndYear
} from "../../utils/time";

const Form = ({ initialState, title }) => {
  const [payment, setPayment] = useState(initialState);

  const submit = useSubmitForm(payment);

  const { handleSubmit, isLoading, errors, doValidateInput } = submit;
  const { due_date, automatic_payment, amount, single_payment } = payment;

  const currDate = new Date();
  const monthAndYear = getMonthAndYear(currDate);
  const maxDate = getMaxDayOfMonth(currDate);
  const minDate = getMinDayOfMonth(currDate);

  useEffect(() => {
    setPayment(initialState);
  }, [initialState]);

  function updatePayment(nextState) {
    setPayment(prevState => {
      return {
        ...prevState,
        ...nextState
      };
    });
  }

  function handleDueDateChange(date) {
    const nextState = { due_date: getTimestampFromDate(date) };
    if (single_payment) updatePayment(nextState);
    else {
      updatePayment({
        months: [{ ...monthAndYear, ...nextState, active: true, amount: null }]
      });
    }
  }

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
          error={errors.amount}
          payment={payment}
          updatePayment={updatePayment}
          doValidateInput={doValidateInput}
        />
      </div>
      <SubmitButton isLoading={isLoading} text="Guardar" />
    </form>
  );
};

export default Form;
