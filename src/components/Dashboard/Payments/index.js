import React, { useEffect, useState } from "react";
import styles from "./Index.module.scss";

import CreateButton from "../../shared/CreateButton";
import ScheduleSelector from "./ScheduleSelector";
import Table from "./Table";

import { Provider as PaymentsProvider } from "../../Context/PaymentsContext";
import useCombinedContexts from "../../Context/useCombinedContexts";

export default () => {
  const [data, setData] = useState([]);
  const { firebase, auth } = useCombinedContexts();

  useEffect(() => {
    if (auth.uid) {
      firebase
        .payments()
        .where("userId", "==", auth.uid)
        .get()
        .then(querySnapshot => {
          const queryData = querySnapshot.docs.map(doc => doc.data());
          if (queryData) setData(queryData);
        });
    }
  }, [auth, auth.uid, firebase]);
  console.log(data);

  return (
    <PaymentsProvider>
      <div className={styles.container}>
        <CreateButton path="/main/new-payment" />
        <ScheduleSelector />
        <Table data={data} />
      </div>
    </PaymentsProvider>
  );
};
