import React from "react";
import { get } from "lodash";

import Form from "../../components/Form";

import { useParams } from "react-router-dom";
import usePayments from "../../components/Payments/usePayments";

const EditPayment = () => {
  const { payments } = usePayments();
  const { id } = useParams();

  const payment = get(payments, `${id}`, {});

  return (
    <div>
      <Form initialState={payment} title="Editá el pago" />
    </div>
  );
};

export default EditPayment;
