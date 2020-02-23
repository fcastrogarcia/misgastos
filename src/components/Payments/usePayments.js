import { useContext } from "react";

import { Context as PaymentsContext } from "../../context/PaymentsContext";

export default () => {
  const context = useContext(PaymentsContext);

  return context;
};
