import React from "react";
import inputStyles from "../../styles/inputs.module.scss";
import formStyles from "./Form.module.scss";

import NumberFormat from "react-number-format";

const Amount = ({ setPayment, amount }) => {
  function handleChange(e) {
    const value = e.floatValue;
    const newData = { amount: value };
    setPayment(newData);
  }

  return (
    <div>
      <h3 className={formStyles["field-title"]}>Ingresá el monto (opcional)</h3>
      <NumberFormat
        className={inputStyles["input"]}
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
