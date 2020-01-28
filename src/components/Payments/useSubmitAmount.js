import { useState } from "react";

import useAuthAndFirebase from "../../context/useAuthAndFirebase";
import usePayments from "./usePayments";

export default () => {
  const [amount, setAmount] = useState({ value: null });
  const [isLoading, setLoading] = useState(false);
  const { firebase } = useAuthAndFirebase();
  const { paymentId: id, toggleModal, payments, time } = usePayments();

  const { months_paid, single_payment } = payments[id];

  const currMonth = {
    ...time,
    ...amount,
    paid_at: new Date()
  };

  function getNextState(single_payment) {
    if (single_payment) {
      return { ...amount, paid_at: new Date() };
    } else {
      const condition = item =>
        item.year === time.year && item.month === time.month;

      const hasRegisteredMonth = months_paid.some(condition);

      const nextState = months_paid.map(item => (condition ? currMonth : item));

      return {
        ...amount,
        months_paid: hasRegisteredMonth
          ? nextState
          : [...months_paid, currMonth]
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    firebase
      .payment(id)
      .update(getNextState(single_payment))
      .finally(() => {
        setLoading(false);
        toggleModal(false);
      });
  }

  return {
    isLoading,
    amount,
    setAmount,
    handleSubmit
  };
};
