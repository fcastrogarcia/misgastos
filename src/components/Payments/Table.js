import React from "react";
import styles from "./Table.module.scss";
import get from "lodash/get";

import Payment from "./Payment";
import SelectedMonth from "./SelectedMonth";
import Dashboard from "./Table-Dashboard";
import Header from "./Table-Header";

import { shouldPaymentRender } from "./utils";
import usePayments from "./usePayments";

const Table = ({ data = {}, loading }) => {
  const { time } = usePayments();

  const ids = Object.keys(data);
  const payments = Object.values(data);
  const shouldPaymentsRender = payments.map(payment =>
    shouldPaymentRender(payment, time)
  );

  const noPayments = !shouldPaymentsRender.length && !loading;

  return (
    <div className={styles["table-wrapper"]}>
      <SelectedMonth />
      <Dashboard />
      <table className={styles.table}>
        <Header />
        <tbody>
          {payments.map((item, index) => {
            const timestamp = get(item, "due_date.seconds", null);
            return (
              <Payment
                key={index}
                item={item}
                index={index}
                timestamp={timestamp}
                id={ids[index]}
                shouldRender={shouldPaymentsRender[index]}
              />
            );
          })}
        </tbody>
      </table>
      {noPayments && (
        <h3 className={styles["no-payments"]}>No hay pagos registrados.</h3>
      )}
    </div>
  );
};

export default Table;
