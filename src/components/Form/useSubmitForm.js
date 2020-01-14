import { useState } from "react";
import { useHistory } from "react-router-dom";
import useCombinedContexts from "../Context/useCombinedContexts";
import pick from "lodash/pick";

export default payment => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ category: false, amount: false });

  const { firebase, auth } = useCombinedContexts();
  const history = useHistory();

  const isFormValid = () => Object.values(errors).every(error => !error);

  const doValidateInput = payload => {
    const errorsObj = {};
    const keys = Object.keys(payload);

    keys.forEach(key => {
      if (!payload[key] && !errors[key]) errorsObj[key] = true;
      if (payload[key] && errors[key]) errorsObj[key] = false;
    });
    setErrors(prevState => {
      return { ...prevState, ...errorsObj };
    });
  };

  const categoryAndAmount = pick(payment, ["category", "amount"]);

  function handleSubmit(e) {
    e.preventDefault();
    doValidateInput(categoryAndAmount);
    const validated = isFormValid();

    if (validated) {
      setLoading(true);
      firebase
        .payments()
        .add({
          ...payment,
          userId: auth.uid,
          createdAt: firebase.fieldValue.serverTimestamp()
        })
        .then(() => setLoading(false))
        .then(() => history.push("/main/payments"))
        .catch(() => setLoading(false));
    }
  }

  return { handleSubmit, isLoading, doValidateInput, errors };
};
