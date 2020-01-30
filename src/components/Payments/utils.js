import { get, isEqual } from "lodash";
import {
  currTimestamp,
  getMonthAndYear,
  getDateFromTimestamp
} from "../../utils/time";

const status = [
  "Pago automático",
  "Pendiente",
  "Vencido",
  "Pagado",
  "Vence pronto"
];

const hasPaidCurrentMonth = (months_paid, time) => {
  return months_paid.find(item =>
    isEqual({ month: item.month, year: item.year }, time)
  );
};

const currentTime = getMonthAndYear(new Date());

const getTimestamp = date => get(date, "seconds", null);

export const shouldPaymentRender = (item, time) => {
  const { paid_at, due_date, single_payment } = item;

  if (due_date) {
    const date = getDateFromTimestamp(due_date.seconds);
    const monthAndYear = getMonthAndYear(date);
    return isEqual(monthAndYear, time);
  } else if (!single_payment || !paid_at) {
    return true;
  } else if (paid_at) {
    const date = getDateFromTimestamp(paid_at.seconds);
    let monthAndYearOfPayment = getMonthAndYear(date);
    return isEqual(time, monthAndYearOfPayment);
  }
};

export const getPaymentStatus = (payment, time) => {
  const {
    single_payment,
    months_paid,
    automatic_payment,
    due_date,
    paid_at
  } = payment;

  const timestamp = getTimestamp(due_date);

  if (automatic_payment) return status[0];
  if (single_payment && paid_at) return status[3];
  if (timestamp) {
    const timestampMinusThreeDays = timestamp - 259200;

    return timestamp < currTimestamp
      ? status[2]
      : currTimestamp > timestampMinusThreeDays
      ? status[4]
      : status[1];
  }
  if (single_payment && !paid_at) return status[1];
  if (!single_payment && !months_paid.length) return status[1];
  if (!single_payment && months_paid.length) {
    const currMonth = hasPaidCurrentMonth(months_paid, time);
    return !currMonth ? status[1] : status[3];
  }
};

export const getStatusClassname = status => {
  return status
    .toLowerCase()
    .normalize("NFD")
    .replace(" ", "-")
    .replace(/[\u0300-\u036f]/g, "");
};

export const isPendingFromPastMonths = (status, selectedTime) => {
  const hasSelectedTimeTranscurred =
    selectedTime.year < currentTime.year ||
    (selectedTime.year === currentTime.year &&
      selectedTime.month < currentTime.month);

  const isPaymentPending = status === "Pendiente";
  return hasSelectedTimeTranscurred && isPaymentPending;
};

export const countPaymentStatus = (payments, time) => {
  const statusArr = Object.values(payments).map(payment =>
    getPaymentStatus(payment, time)
  );

  return statusArr.reduce((acc, curr) => {
    acc[curr] = ++acc[curr] || 1;
    return acc;
  }, {});
};

export const paymentsPerMonth = (payments, time) => {
  return Object.values(payments).filter(payment =>
    shouldPaymentRender(payment, time)
  );
};

export const getAmount = (payment, time) => {
  const { amount, months_paid } = payment;
  const monthPaid = hasPaidCurrentMonth(months_paid, time);
  return !monthPaid ? amount : monthPaid.amount;
};

export function getMaxVal(arr, val) {
  if (arr.length === 1) {
    return arr[val];
  } else if (arr.length > 1) {
    return arr.reduce((acc, curr) =>
      acc[val] > curr[val] ? acc[val] : curr[val]
    );
  }
}

export function getLastAmountPaid(arr) {
  if (!arr.length) {
    return null;
  } else {
    const maxYear = getMaxVal(arr, "year");
    const monthsPaidInMaxYear = arr.filter(item => item.year === maxYear);

    const maxMonth = getMaxVal(monthsPaidInMaxYear, "month");
    const lastPeriodPaid = monthsPaidInMaxYear.find(
      item => item.month === maxMonth
    );

    const lastAmountPaid = get(lastPeriodPaid, "amount", null);

    return lastAmountPaid;
  }
}
