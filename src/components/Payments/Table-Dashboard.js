import React from "react";
import styles from "./Table-Dashboard.module.scss";

import CreateButton from "../shared/CreateButton";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <CreateButton path="/main/new-payment" text="Crear pago" />
    </div>
  );
};

export default Dashboard;
