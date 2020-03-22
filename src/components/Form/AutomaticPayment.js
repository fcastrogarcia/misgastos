import React from "react";

import Checkbox from "../Checkbox/Checkbox";

const AutomaticPayment = ({ setPayment, isChecked }) => {
  function handleChange() {
    const payload = { automatic_payment: !isChecked };
    setPayment(payload);
  }

  return (
    <Checkbox
      isChecked={isChecked}
      text="Pago automático"
      handleChange={handleChange}
    />
  );
};

export default AutomaticPayment;
