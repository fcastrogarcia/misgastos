import React from "react";

import MainActionButton from "../MainActionButton";

const style = {
  gridArea: "create-payment",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
};

const CreatePayment = () => {
  return (
    <div style={style}>
      <MainActionButton path="/main/new-payment" text="Agregar pago" />
    </div>
  );
};

export default CreatePayment;
