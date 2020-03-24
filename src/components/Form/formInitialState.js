const defaultState = {
  single_payment: true,
  automatic_payment: false,
  category: "",
  provider: "",
  due_date: null,
  amount: null,
  months: [],
  paid_at: null
  //paid at aplica únicamente a los pagos únicos, los mensuales
  //se registran dentro de months
};

export default defaultState;
