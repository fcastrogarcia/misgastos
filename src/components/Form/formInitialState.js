const defaultState = {
  single_payment: true,
  automatic_payment: false,
  category: "",
  provider: "",
  due_date: null,
  amount: null,
  months_paid: [],
  paid_at: null
  //paid at aplica únicamente a los pagos únicos, los mensuales
  //se registran dentro de months_paid
};

export default defaultState;
