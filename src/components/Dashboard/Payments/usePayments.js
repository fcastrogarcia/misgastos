import { useContext } from "react";

import { Context as PaymentsContext } from "../../Context/PaymentsContext";

export default () => {
  const context = useContext(PaymentsContext);

  return context;
};
