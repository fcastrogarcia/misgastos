import React from "react";
import cx from "classnames";
import styles from "../../styles/inputs.module.scss";

import NumberFormat from "react-number-format";

import { hasPaidCurrentMonth } from "../../utils/payments";
import { getMonthAndYear } from "../../utils/time";

const Amount = props => {
  const {
    error,
    className,
    placeholder,
    payment,
    updatePayment,
    doValidateInput
  } = props;

  const { amount, single_payment, months } = payment;

  const monthAndYear = getMonthAndYear(new Date());
  const isMonthPaid = hasPaidCurrentMonth(payment.months, monthAndYear);

  function handleAmountChange(e) {
    const value = e.floatValue;
    const payload = { amount: value };

    doValidateInput && doValidateInput(payload);

    if (single_payment) updatePayment(payload);
    else {
      const nextMonth = {
        amount: value,
        ...monthAndYear,
        due_date: null,
        active: true
      };
      console.log("montghAndYear", monthAndYear);
      console.log(months);
      const nextMonths = months.map(month =>
        monthAndYear.month === month.month && monthAndYear.year === month.year
          ? { amount: value, ...isMonthPaid }
          : month
      );

      return updatePayment({
        months: !isMonthPaid ? [...months, nextMonth] : nextMonths
      });
    }
  }

  console.log(payment);

  return (
    <NumberFormat
      className={cx(styles["input"], className, { [styles.error]: error })}
      prefix={"$"}
      allowNegative={false}
      onValueChange={handleAmountChange}
      value={single_payment ? amount : isMonthPaid ? isMonthPaid.amount : null}
      decimalSeparator={","}
      thousandSeparator={"."}
      required
      placeholder={placeholder}
    />
  );
};

export default Amount;
