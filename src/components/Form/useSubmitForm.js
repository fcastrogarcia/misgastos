import { useState } from "react";
import { useHistory } from "react-router-dom";
import useAuthAndFirebase from "../../context/useAuthAndFirebase";
import pick from "lodash/pick";

export default payment => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ category: false, amount: false });

  const { firebase, auth } = useAuthAndFirebase();
  const history = useHistory();

  const isFormValid = Object.values(errors).every(error => !error);

  const doValidateInput = payload => {
    const nextState = {};
    const keys = Object.keys(payload);

    keys.forEach(key => {
      if (!payload[key] && !errors[key]) nextState[key] = true;
      if (payload[key] && errors[key]) nextState[key] = false;
    });
    setErrors(prevState => {
      return { ...prevState, ...nextState };
    });
  };

  const categoryAndAmount = pick(payment, ["category", "amount"]);

  function handleSubmit(e) {
    e.preventDefault();
    doValidateInput(categoryAndAmount);

    if (isFormValid) {
      setLoading(true);

      firebase
        .payments()
        .add({
          ...payment,
          userId: auth.uid,
          createdAt: firebase.fieldValue.serverTimestamp()
        })
        .finally(() => {
          setLoading(false);
          history.push("/main/payments");
        });
    }
  }

  return { handleSubmit, isLoading, doValidateInput, errors };
};
