import React, { useState } from "react";
import cx from "classnames";
import styles from "./View.module.scss";
import Calendar from "react-calendar";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default ({ payment, setPayment, setIndex }) => {
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const { single_payment } = payment;

  function validator(value) {
    let validated = true;
    if (value > 31) {
      validated = !validated;
    }
    return validated;
  }
  function handleCalendar(date) {
    let timestamp = Date.parse(date);
    setDate(timestamp);
  }
  function handleChange(event) {
    const { value } = event.target;
    const validated = validator(value);
    if (!validated) {
      setError(true);
    } else {
      setDate(value);
      setError(false);
    }
  }
  function handleNavigation(date) {
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
  //hay que validar caracteres especiales

  console.log(date);
  return (
    <div className={styles.view}>
      {single_payment ? (
        <React.Fragment>
          <h3 className={styles.title}>Agendá el vencimiento</h3>
          <Calendar onClickDay={handleCalendar} />
        </React.Fragment>
      ) : (
        <div>
          <h3 className={styles.title}>Ingresá el día del vencimiento</h3>
          <p>(opcional)</p>
          <div style={{ position: "relative" }}>
            <input
              className={cx(styles.input, styles.v3, {
                [styles.error]: error
              })}
              type="number"
              placeholder="Ej.: 26"
              min="1"
              max="31"
              onChange={handleChange}
            ></input>
            {error && (
              <p className={cx(styles.message, { [styles.error]: error })}>
                Ingresá un número entre 1 y 31
              </p>
            )}
          </div>
        </div>
      )}
      <button className={styles.prev} onClick={() => setIndex(1)}>
        <FaArrowLeft />
      </button>
      <button className={styles.next} onClick={handleNavigation}>
        <FaArrowRight />
      </button>
    </div>
  );
};
