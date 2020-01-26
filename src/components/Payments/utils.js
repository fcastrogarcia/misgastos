import { get } from "lodash";
import { currTimestamp, getCurrentTime } from "../../utils/time";

const states = ["Pago automático", "Pendiente", "Vencido", "Pagado"];
const currentTime = getCurrentTime();

export const getPaymentState = (payment, time) => {
  const {
    single_payment,
    active,
    months_paid,
    automatic_payment,
    due_date
  } = payment;

  const timestamp = get(due_date, "seconds", null);

  if (automatic_payment) return states[0];
  if (timestamp) return timestamp < currTimestamp ? states[2] : states[1];
  if (single_payment && active) return states[1];
  if (single_payment && !active) return states[3];
  if (!single_payment && !months_paid.length) return states[1];
  if (!single_payment && months_paid.length) {
    const currMonth = months_paid.find(
      item => item.year === time.year && item.month === time.month
    );
    return currMonth.paid ? states[3] : states[1];
  }
};

export const getStateClassname = state => {
  return state
    .toLowerCase()
    .normalize("NFD")
    .replace(" ", "-")
    .replace(/[\u0300-\u036f]/g, "");
};

export const isPendingFromPastMonths = (state, selectedTime) => {
  const hasSelectedTimeTranscurred =
    selectedTime.year < currentTime.year ||
    (selectedTime.year === currentTime.year &&
      selectedTime.month < currentTime.month);

  const isPaymentPending = state === "Pendiente";
  return hasSelectedTimeTranscurred && isPaymentPending;
};

//cuando estemos en febrero printear hasSelectedTimeTranscurred a ver si funciona bien
