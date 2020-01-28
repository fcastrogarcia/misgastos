import { get, isEqual } from "lodash";
import {
  currTimestamp,
  getMonthAndYear,
  getDateFromTimestamp
} from "../../utils/time";

const status = ["Pago automático", "Pendiente", "Vencido", "Pagado"];

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
  if (timestamp) return timestamp < currTimestamp ? status[2] : status[1];
  if (single_payment && !paid_at) return status[1];
  if (!single_payment && !months_paid.length) return status[1];
  if (!single_payment && months_paid.length) {
    const currMonth = months_paid.find(
      item => item.year === time.year && item.month === time.month
    );
    return !currMonth ? status[1] : status[3];
  }
};

export const getStatusClassname = state => {
  return state
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

//cuando estemos en febrero printear hasSelectedTimeTranscurred a ver si funciona bien
