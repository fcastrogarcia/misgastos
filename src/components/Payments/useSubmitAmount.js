import { useState } from "react";
import { isEqual } from "lodash";

import { getLastAmountPaid } from "./utils";
import useAuthAndFirebase from "../../context/useAuthAndFirebase";
import usePayments from "./usePayments";

export default () => {
  const [amount, setAmount] = useState({ value: null });
  const [date, setDate] = useState(new Date());
  const [isLoading, setLoading] = useState(false);

  const { firebase } = useAuthAndFirebase();
  const { paymentId: id, toggleModal, payments, time } = usePayments();

  const { months_paid, single_payment } = payments[id];

  const currMonth = {
    ...time,
    ...amount,
    paid_at: date
  };

  function getNextState(single_payment) {
    if (single_payment) {
      return { ...amount, paid_at: date };
    } else {
      const condition = item =>
        isEqual({ month: item.month, year: item.year }, time);

      const hasRegisteredMonth = months_paid.some(condition);

      const nextState = months_paid.map(item =>
        condition(item) ? currMonth : item
      );

      const isThereAnOlderPayment = months_paid.some(
        item => item.year === time.year && item.month > time.month
      );

      const getAmount = () => {
        return !isThereAnOlderPayment
          ? amount.amount
          : getLastAmountPaid(months_paid);
      };

      return {
        amount: getAmount(),
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
    handleSubmit,
    date,
    setDate
  };
};
