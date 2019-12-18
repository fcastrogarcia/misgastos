import React, { useEffect, useState } from "react";
import styles from "./Payments.module.scss";
import cx from "classnames";
import useCombinedContexts from "../../Context/useCombinedContexts";

export default () => {
  const [data, setData] = useState([]);
  const { firebase, auth } = useCombinedContexts();

  useEffect(() => {
    firebase
      .payments()
      .where("userId", "==", auth.uid)
      .get()
      .then(querySnapshot => {
        const queryData = querySnapshot.docs.map(doc => doc.data());
        if (queryData) setData(queryData);
      });
  }, []);

  return <div>hola</div>;
};
