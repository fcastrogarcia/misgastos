import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Fab from "./Fab";

export default () => {
  const initialState = {
    single_payment: undefined,
    category: "",
    provider: "",
    due_date: undefined,
    amount: undefined,
    months_paid: []
  };
  const [payment, setPayment] = useState(initialState);
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setPayment(initialState);
      setIndex(0);
    }
  }, [open]);

  return (
    <React.Fragment>
      <Modal {...{ open, setOpen, payment, setPayment, index, setIndex }} />
      <Fab {...{ open, setOpen }} />
    </React.Fragment>
  );
};
