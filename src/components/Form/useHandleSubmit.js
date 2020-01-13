import { useState } from "react";
import { useHistory } from "react-router-dom";
import useCombinedContexts from "../Context/useCombinedContexts";

export default payment => {
  const [isLoading, setLoading] = useState(false);
  const { firebase, auth } = useCombinedContexts();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
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

  return { handleSubmit, isLoading };
};
