import React from "react";
import cx from "classnames";
import styles from "../../styles/inputs.module.scss";

import NumberFormat from "react-number-format";

const Amount = ({ setter, amount, error, doValidateInput, containerStyle }) => {
  function handleChange(e) {
    const value = e.floatValue;
    const payload = { amount: value };
    doValidateInput && doValidateInput(payload);
    setter(payload);
  }

  return (
    <div className={containerStyle}>
      <h3 className="section-subheading">Ingresá el monto</h3>
      <NumberFormat
        className={cx(styles["input"], { [styles.error]: error })}
        prefix={"$"}
        allowNegative={false}
        onValueChange={handleChange}
        value={amount}
        decimalSeparator={","}
        thousandSeparator={"."}
        required
      />
    </div>
  );
};

export default Amount;
