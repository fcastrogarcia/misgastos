import React, { useState, useEffect } from "react";
import styles from "./Payment-Modal.module.scss";
import cx from "classnames";

import Amount from "../shared/AmountInput";
import SubmitButton from "../shared/SubmitButton";
import DatePicker from "../shared/DatePicker";

import useSubmitAmount from "./useSubmitAmount";

export default ({ isOpen, toggle }) => {
  const [shouldRender, setRender] = useState(isOpen);

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

  const handleChange = date => setDate(date);

  const animationStyle = { animation: `${isOpen ? "fadeIn" : "fadeOut"} .2s` };

  return (
    shouldRender && (
      <div
        className={styles.background}
        style={animationStyle}
        onAnimationEnd={handleAnimationEnd}
      >
        <form className={styles.modal} onSubmit={handleSubmit}>
          <h1 className={cx("section-heading", styles.title)}>
            Registrá el pago
          </h1>
          <Amount
            containerStyle={styles.input}
            setter={setAmount}
            amount={amount.value}
            doValidateInput={false}
            required
          />
          <DatePicker
            text="Registrá la fecha"
            style={styles.date}
            date={date}
            handleChange={handleChange}
            required
          />
          <SubmitButton
            isLoading={isLoading}
            text="Guardar"
            style={styles.submit}
          />
          <button className={styles.cancel} onClick={() => toggle(false)}>
            Cancelar
          </button>
        </form>
      </div>
    )
  );
};

// revisar que no está haciendo la transición el modal en el unmounting.
