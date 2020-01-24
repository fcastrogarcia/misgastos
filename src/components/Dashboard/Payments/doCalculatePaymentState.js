import usePayments from "./usePayments";

const states = ["Pago automático", "Pendiente", "Vencido", "Pagado"];

export default payment => {
  const { time } = usePayments();
  const { single_payment, active, months_paid, automatic_payment } = payment;

  if (automatic_payment) return states[0];
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

