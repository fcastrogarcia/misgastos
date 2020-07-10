import React, { useReducer } from "react";
import styles from "./Table.module.scss";
import { object, objectOf, bool } from "prop-types";

import Payment from "./Payment";
import SelectedMonth from "./SelectedMonth";
import CreatePayment from "./CreatePayment";
import Header from "./Table-Header";
import Loader from "./components/Loader";

import { sortTable } from "./utils";

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

const Table = ({ payments, loading, noPayments }) => {
  const [sortBy, dispatch] = useReducer(reducer, "category");
  const sortedPayments = sortTable(payments, sortBy);
  const filteredPayments = payments.filter((payment) => payment.shouldRender);

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
        {(noPayments || !filteredPayments.length) && !loading && (
          <h3 className={styles["no-payments"]}>No hay pagos registrados.</h3>
        )}
      </div>
    </div>
  );
};

Table.propTypes = {
  data: objectOf(object),
  loading: bool,
};

Table.defaultProps = {
  data: {},
};

export default Table;
