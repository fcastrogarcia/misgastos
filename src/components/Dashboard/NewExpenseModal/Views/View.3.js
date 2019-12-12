import React, { useState } from "react";
import styles from "./View.module.scss";
import cn from "classnames";
import Calendar from "react-calendar";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default ({ payment, setPayment, setIndex }) => {
  const [date, setDate] = useState(null);
  // const { single_payment } = payment;

  function handleChange(date) {
    let timestamp = Date.parse(date);
    setDate(timestamp);
  }
  function handleNavigation() {
    if (date) {
      setPayment(prevState => {
        return {
          ...prevState,
          due_date: date
        };
      });
      return setIndex(3);
    } else {
      alert("No ingresaste una fecha");
    }
  }

  return (
    <div className={styles.view}>
      <h3>Agendá el vencimiento</h3>
      <Calendar onClickDay={handleChange} />
      <button className={styles.prev} onClick={() => setIndex(1)}>
        <FaArrowLeft />
      </button>
      <button className={styles.next} onClick={handleNavigation}>
        <FaArrowRight />
      </button>
    </div>
  );
};
