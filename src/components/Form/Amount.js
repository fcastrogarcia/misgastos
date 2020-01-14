import React from "react";
import cx from "classnames";
import styles from "../../styles/inputs.module.scss";

import NumberFormat from "react-number-format";

const Amount = ({ setPayment, amount, errors, doValidateInput }) => {
  function handleChange(e) {
    const value = e.floatValue;
    const payload = { amount: value };
    doValidateInput(payload);
    setPayment(payload);
  }

  return (
    <div>
      <h3 className="section-subheading">Ingresá el monto (opcional)</h3>
      <NumberFormat
        className={cx(styles["input"], { [styles.error]: errors.amount })}
        prefix={"$"}
        allowNegative={false}
        onValueChange={handleChange}
        value={amount}
        decimalSeparator={","}
        thousandSeparator={"."}
      />
    </div>
  );
};

export default Amount;
