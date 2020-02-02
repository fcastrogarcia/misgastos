import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useAuthAndFirebase from "../../context/useAuthAndFirebase";
import { pick, get } from "lodash";

export default payment => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ category: false, amount: false });

  const { firebase, auth } = useAuthAndFirebase();
  const history = useHistory();
  const params = useParams();

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
    const id = get(params, "id", "");

    const endDbCall = () => {
      setLoading(false);
      history.push("/main/payments");
    };

    if (isFormValid) {
      setLoading(true);

      if (id) {
        return firebase
          .payments()
          .doc(id)
          .set({
            ...payment
          })
          .finally(endDbCall);
      } else {
        firebase
          .payments()
          .add({
            ...payment,
            userId: auth.uid,
            createdAt: firebase.fieldValue.serverTimestamp()
          })
          .finally(endDbCall);
      }
    }
  }

  return { handleSubmit, isLoading, doValidateInput, errors };
};
