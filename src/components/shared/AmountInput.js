import React from "react";
import cx from "classnames";
import styles from "../../styles/inputs.module.scss";

import NumberFormat from "react-number-format";

const Amount = props => {
  const {
    setter,
    amount,
    error,
    doValidateInput,
    className,
    placeholder
  } = props;

  function handleChange(e) {
    const value = e.floatValue;
    const payload = { amount: value };
    doValidateInput && doValidateInput(payload);
    setter(payload);
  }

  return (
    <NumberFormat
      className={cx(styles["input"], className, { [styles.error]: error })}
      prefix={"$"}
      allowNegative={false}
      onValueChange={handleChange}
      value={amount}
      decimalSeparator={","}
      thousandSeparator={"."}
      required
      placeholder={placeholder}
    />
  );
};

export default Amount;
