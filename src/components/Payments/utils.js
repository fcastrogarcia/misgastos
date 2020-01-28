import { get, isEqual } from "lodash";
import { currTimestamp, getMonthAndYear } from "../../utils/time";

const status = ["Pago automático", "Pendiente", "Vencido", "Pagado"];

const currentTime = getMonthAndYear(new Date());
const getTimestamp = date => get(date, "seconds", null);

export const shouldPaymentRender = (paid_at, time, single_payment) => {
  const timestamp = getTimestamp(paid_at);

  if (!single_payment || !timestamp) {
    return true;
  } else if (timestamp) {
    const paidAt = new Date(timestamp * 1000);
    let monthAndYearOfPayment = getMonthAndYear(paidAt);
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
    return currMonth.paid_at ? status[3] : status[1];
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
