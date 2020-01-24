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
    paid_at: new Date(),
    paid: true
  };

  function nextState(single_payment) {
    if (single_payment) {
      return { active: false, ...amount };
    } else {
      const condition = item =>
        item.year === time.year && item.month === time.month;

      const hasRegisteredMonth = months_paid.some(condition);

      const monthsPaid = months_paid.map(item => {
        if (condition) {
          return currMonth;
        } else {
          return item;
        }
      });

      return {
        ...amount,
        months_paid: hasRegisteredMonth ? monthsPaid : currMonth
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    firebase
      .payment(id)
      .update(nextState(single_payment))
      .then(() => setLoading(false))
      .then(() => toggleModal(false));
  }

  return {
    isLoading,
    amount,
    setAmount,
    handleSubmit
  };
};
