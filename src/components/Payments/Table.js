import React from "react";
import styles from "./Table.module.scss";

import Payment from "./Payment";
import SelectedMonth from "./SelectedMonth";
import CreatePayment from "./CreatePayment";
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
      <CreatePayment />
      <table className={styles.table}>
        <Header />
        <tbody>
          {payments.map((item, index) => (
            <Payment
              key={index}
              item={item}
              index={index}
              timestamp={item.due_date}
              id={ids[index]}
              shouldRender={shouldPaymentsRender[index]}
            />
          ))}
        </tbody>
      </table>
      {noPayments && (
        <h3 className={styles["no-payments"]}>No hay pagos registrados.</h3>
      )}
    </div>
  );
};

export default Table;
