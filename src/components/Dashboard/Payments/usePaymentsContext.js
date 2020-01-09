import { useContext } from "react";

import { context as PaymentsContext } from "../../Context/PaymentsContext";

export default () => {
  const context = useContext(PaymentsContext);

  return context;
};
