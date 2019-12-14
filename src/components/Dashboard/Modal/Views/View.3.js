import React, { useState } from "react";
import cx from "classnames";
import styles from "./View.module.scss";
import Calendar from "react-calendar";
import Navigation from "./Navigation";

const SinglePaymentView = ({ handleCalendar }) => (
  <React.Fragment>
    <h3 className={cx(styles.title)}>Agendá el vencimiento</h3>
    <p>(opcional)</p>
    <Calendar onClickDay={handleCalendar} />
  </React.Fragment>
);

const MonthlyPaymentView = ({ handleChange, error }) => (
  <div>
    <h3 className={styles.title}>Ingresá el día del vencimiento</h3>
    <p>(opcional)</p>
    <div style={{ position: "relative" }}>
      <input
        className={cx(styles.input, styles["extra-margin-bottom"], {
          [styles.error]: error
        })}
        type="number"
        placeholder="Ej.: 26"
        min="1"
        max="31"
        onChange={handleChange}
      ></input>
      {error && (
        <p className={styles["error-message"]}>
          Ingresá un número entre 1 y 31
        </p>
      )}
    </div>
  </div>
);

export default ({ payment, setPayment, setIndex }) => {
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const { single_payment } = payment;

  function validator(value) {
    //number between 1-31
    const regex = /^([1-9]|1\d|2\d|3[0-1])(\.\d{1,2})?$/g;
    let validated = regex.test(value);
    return validated;
  }

  function handleCalendar(date) {
    let timestamp = Date.parse(date);
    setDate(timestamp);
  }

  function handleChange(event) {
    const { value } = event.target;
    const validated = validator(value);
    if (!validated && value) {
      setError(true);
    } else {
      setDate(value);
      setError(false);
    }
  }

  function handleForward() {
    if (single_payment || !error) {
      setPayment(prevState => {
        return {
          ...prevState,
          due_date: date
        };
      });
      return setIndex(3);
    }
  }

  return (
    <div className={styles["full-space-container"]}>
      {single_payment ? (
        <SinglePaymentView handleCalendar={handleCalendar} />
      ) : (
        <MonthlyPaymentView handleChange={handleChange} error={error} />
      )}
      <Navigation
        handleBackward={() => setIndex(1)}
        handleForward={handleForward}
      />
    </div>
  );
};
