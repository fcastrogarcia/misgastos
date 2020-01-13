import React from "react";
import cx from "classnames";
import styles from "./Form.module.scss";

import formInitialState from "./formInitialState";

const Button = ({ text, payment, setPayment, singlePayment }) => {
  function handleChange(_) {
    setPayment({
      ...formInitialState,
      automatic_payment: payment.automatic_payment,
      single_payment: singlePayment
    });
  }

  return (
    <label
      className={cx(styles.option, {
        [styles.selected]: payment.single_payment === singlePayment
      })}
    >
      {text}
      <input
        className={styles.checkbox}
        type="checkbox"
        onChange={handleChange}
      />
    </label>
  );
};

const PaymentType = ({ setPayment, payment }) => {
  return (
    <div>
      <h3 className="section-subheading">Seleccioná el tipo de pago</h3>
      <div className={styles.wrapper}>
        <Button
          setPayment={setPayment}
          payment={payment}
          text="Único"
          singlePayment={true}
        />
        <Button
          setPayment={setPayment}
          payment={payment}
          text="Mensual"
          singlePayment={false}
        />
      </div>
    </div>
  );
};

export default PaymentType;
