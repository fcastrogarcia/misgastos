import React from "react";

import defaultState from "../../components/Form/formInitialState";

import Form from "../../components/Form";

const NewPayment = () => {
  return (
    <div>
      <Form initialState={defaultState} />
    </div>
  );
};

export default NewPayment;
