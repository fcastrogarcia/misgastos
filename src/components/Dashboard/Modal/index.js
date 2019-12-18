import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Fab from "./Fab";

export default () => {
  const initialState = {
    single_payment: null,
    category: "",
    provider: "",
    due_date: null,
    amount: null,
    months_paid: []
  };
  const [payment, setPayment] = useState(initialState);
  const [open, setOpen] = useState(false);
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
