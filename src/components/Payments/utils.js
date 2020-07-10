import { isEqual, get } from "lodash";
import {
  getTimestampFromDate,
  getMonthAndYear,
  getDateFromTimestamp,
} from "../../utils/time";

const status = [
  "Pago automático",
  "Pendiente",
  "Vencido",
  "Pagado",
  "Vence pronto",
];

const hasPaidCurrentMonth = (months_paid, time) => {
  return months_paid.find((item) =>
    isEqual({ month: item.month, year: item.year }, time)
  );
};

const currTimestamp = getTimestampFromDate(new Date());

const currentTime = getMonthAndYear(new Date());

export const shouldPaymentRender = (item, time) => {
  const { paid_at, due_date, single_payment, createdAt } = item;

  const seconds = get(createdAt, "seconds");
  const createdAtDate = !single_payment && getDateFromTimestamp(seconds);
  const createdAtMonthAndYear = getMonthAndYear(createdAtDate);
  const wasPaymentCreatedAfter =
    !single_payment && !hasTimeTranscurred(createdAtMonthAndYear, time);

  if (due_date) {
    const date = getDateFromTimestamp(due_date);
    const monthAndYear = getMonthAndYear(date);
    return isEqual(monthAndYear, time);
  } else if (single_payment && !due_date && !paid_at) {
    return isEqual(currentTime, time);
  } else if (wasPaymentCreatedAfter) {
    return true;
  } else if (paid_at) {
    const date = getDateFromTimestamp(paid_at);
    let monthAndYearOfPayment = getMonthAndYear(date);
    return isEqual(time, monthAndYearOfPayment);
  } else {
    return false;
  }
};

const hasTimeTranscurred = (currentTime, selectedTime) => {
  if (selectedTime) {
    const hasYearTranscurred = selectedTime.year < currentTime.year;
    const hasMonthTranscurred =
      selectedTime.year === currentTime.year &&
      selectedTime.month < currentTime.month;

    return hasYearTranscurred || hasMonthTranscurred;
  }
};

export const getPaymentStatus = (payment, time) => {
  const {
    single_payment,
    months_paid,
    automatic_payment,
    due_date,
    paid_at,
  } = payment;

  if (automatic_payment) return status[0];
  if (single_payment && paid_at) return status[3];
  if (due_date) {
    const timestampMinusThreeDays = due_date - 259200;

    return due_date < currTimestamp
      ? status[2]
      : currTimestamp > timestampMinusThreeDays
      ? status[4]
      : status[1];
  }
  if (single_payment && !paid_at) return status[1];
  if (!single_payment) {
    const isItPaid = hasPaidCurrentMonth(months_paid, time);
    const isFromPastMonths = hasTimeTranscurred(currentTime, time);

    return isItPaid ? status[3] : isFromPastMonths ? status[2] : status[1];
  }
};

export const getStatusClassname = (status) => {
  return status
    .toLowerCase()
    .normalize("NFD")
    .replace(" ", "-")
    .replace(/[\u0300-\u036f]/g, "");
};

export const countPaymentStatus = (payments, time) => {
  const statusArr = Object.values(payments).map((payment) =>
    getPaymentStatus(payment, time)
  );

  return statusArr.reduce((acc, curr) => {
    acc[curr] = ++acc[curr] || 1;
    return acc;
  }, {});
};

export const paymentsPerMonth = (payments, time) => {
  return Object.values(payments).filter((payment) =>
    shouldPaymentRender(payment, time)
  );
};

export const getAmount = (payment, time) => {
  const { amount, months_paid } = payment;
  const monthPaid = hasPaidCurrentMonth(months_paid, time);
  return !monthPaid ? amount : monthPaid.amount;
};

export function getMaxVal(arr, key) {
  if (arr.length === 1) {
    return arr[key];
  } else if (arr.length > 1) {
    return arr.reduce((acc, curr) =>
      acc[key] > curr[key] ? acc[key] : curr[key]
    );
  }
}

export function getLastAmountPaid(arr) {
  if (!arr.length) return null;

  const maxYear = getMaxVal(arr, "year");
  const monthsPaidInMaxYear = arr.filter((item) => item.year === maxYear);

  const lastAmountPaid = monthsPaidInMaxYear.reduce((acc, curr) =>
    acc.month > curr.month ? acc : curr
  ).amount;

  return lastAmountPaid;
}

export function sortTable(arr, criteria) {
  return arr.sort((a, b) => (a[criteria] > b[criteria] ? 1 : -1));
}

export function getTotalAmount(payments) {
  return Object.values(payments).reduce((acc, curr) => curr.amount + acc, 0);
}

export function getAmountByStatus(payments, status) {
  const filteredPayments = payments.filter((p) => p.status === status);
  if (filteredPayments.length) {
    return filteredPayments.reduce((acc, curr) => curr.amount + acc, 0);
  }
  return null;
}
