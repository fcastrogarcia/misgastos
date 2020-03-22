import React, { useReducer } from "react";
import styles from "./Table.module.scss";

import Payment from "./Payment";
import SelectedMonth from "./SelectedMonth";
import CreatePayment from "./CreatePayment";
import Header from "./Table-Header";
import Loader from "./Loader";

import { shouldPaymentRender, getPaymentStatus } from "./utils";
import { sortTable } from "./utils";
import usePayments from "./usePayments";

const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORÍA": {
      return "category";
    }
    case "MONTO": {
      return "amount";
    }
    case "PROVEEDOR": {
      return "provider";
    }
    case "VENCIMIENTO": {
      return "due_date";
    }
    case "ESTADO": {
      return "status";
    }
    default:
      return state;
  }
};

const Table = ({ data = {}, loading }) => {
  const [sortBy, dispatch] = useReducer(reducer, "category");
  const { time } = usePayments();

  const ids = Object.keys(data);
  const payments = Object.values(data);
  const statusArr = payments.map(payment => getPaymentStatus(payment, time));
  const shouldPaymentsRender = payments.map(payment =>
    shouldPaymentRender(payment, time)
  );
  const p = payments.map((item, index) => {
    return {
      ...item,
      id: ids[index],
      status: statusArr[index],
      shouldRender: shouldPaymentsRender[index]
    };
  });
  const sortedPayments = sortTable(p, sortBy);

  const noPayments = !shouldPaymentsRender.length && !loading;

  return (
    <div className={styles.container}>
      <div className={styles["table-wrapper"]}>
        <SelectedMonth />
        <CreatePayment />
        <table className={styles.table}>
          <Header dispatch={dispatch} />
          <tbody>
            {sortedPayments.map((item, index) => (
              <Payment
                key={index}
                item={item}
                index={index}
                timestamp={item.due_date}
              />
            ))}
            {loading && <Loader />}
          </tbody>
        </table>
        {noPayments && (
          <h3 className={styles["no-payments"]}>No hay pagos registrados.</h3>
        )}
      </div>
    </div>
  );
};

export default Table;
