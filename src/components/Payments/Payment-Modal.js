import React, { useState, useEffect } from "react";
import styles from "./Payment-Modal.module.scss";
import cx from "classnames";

import SubmitButton from "../shared/SubmitButton";
import DatePicker from "../shared/DatePicker";
import Amount from "../shared/AmountInput";
import { IoMdClose } from "react-icons/io";

import useSubmitAmount from "./useSubmitAmount";
import usePayments from "./usePayments";
import { doFormatMonthAndYear } from "../../utils/masks";
import { getTimestampFromDate } from "../../utils/time";

export default ({ isOpen, toggle }) => {
  const [shouldRender, setRender] = useState(isOpen);

  const { time } = usePayments();
  const {
    isLoading,
    amount,
    setAmount,
    handleSubmit,
    date,
    setDate
  } = useSubmitAmount();

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  const handleChange = date => setDate(getTimestampFromDate(date));

  const animationStyle = { animation: `${isOpen ? "fadeIn" : "fadeOut"} .2s` };

  return (
    shouldRender && (
      <div
        className={styles.background}
        style={animationStyle}
        onAnimationEnd={handleAnimationEnd}
      >
        <form onSubmit={handleSubmit} className={styles.modal}>
          <div className={styles.grid}>
            <h1 className={cx(styles.title, "modal-title")}>Ingresá el pago</h1>
            <button className={styles.cancel} onClick={() => toggle(false)}>
              <IoMdClose size={19} />
            </button>
            <h3 className={styles.periodo}>
              Período {doFormatMonthAndYear(time)}
            </h3>
            <Amount
              className={styles.amount}
              setter={setAmount}
              amount={amount.value}
              doValidateInput={false}
              required
              placeholder="Ingresá el monto pagado"
            />
            <DatePicker
              className={styles.date}
              date={date}
              handleChange={handleChange}
              required
            />
          </div>
          <div className={styles["buttons-wrapper"]}>
            <SubmitButton
              isLoading={isLoading}
              text="Guardar"
              style={styles.submit}
            />
          </div>
        </form>
      </div>
    )
  );
};

// revisar que no está haciendo la transición el modal en el unmounting.
