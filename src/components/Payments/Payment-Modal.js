import React, { useState, useEffect } from "react";
import styles from "./Payment-Modal.module.scss";

import Amount from "../shared/AmountInput";
import SubmitButton from "../shared/SubmitButton";

import { doFormatMonthAndYear } from "../../utils/masks";
import usePayments from "./usePayments";
import useSubmitAmount from "./useSubmitAmount";

export default ({ isOpen, toggle }) => {
  const [shouldRender, setRender] = useState(isOpen);
  const { time } = usePayments();
  const { isLoading, amount, setAmount, handleSubmit } = useSubmitAmount();

  useEffect(() => {
    if (isOpen) setRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  const animationStyle = { animation: `${isOpen ? "fadeIn" : "fadeOut"} .2s` };

  return (
    shouldRender && (
      <div
        className={styles.background}
        style={animationStyle}
        onAnimationEnd={handleAnimationEnd}
      >
        <form className={styles.modal} onSubmit={handleSubmit}>
          <h1 className="section-heading">Registrá el pago</h1>
          <h3 className="section-subheading">
            correspondiente al {doFormatMonthAndYear(time)}
          </h3>
          <Amount
            setter={setAmount}
            amount={amount.value}
            doValidateInput={false}
            required
          />
          <SubmitButton isLoading={isLoading} text="Guardar" />
          <button className={styles.cancel} onClick={() => toggle(false)}>
            Cancelar
          </button>
        </form>
      </div>
    )
  );
};

// revisar que no está haciendo la transición el modal en el unmounting.
