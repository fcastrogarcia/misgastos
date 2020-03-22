import React from "react";

import CreateButton from "../shared/CreateButton";

const style = {
  gridArea: "create-payment",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
};

const CreatePayment = () => {
  return (
    <div style={style}>
      <CreateButton path="/main/new-payment" text="Agregar pago" />
    </div>
  );
};

export default CreatePayment;
