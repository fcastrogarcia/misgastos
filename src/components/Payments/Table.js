import React from "react";
import styles from "./Table.module.scss";
import cx from "classnames";
import get from "lodash/get";

import { FaSort } from "react-icons/fa";
import Payment from "./Payment";
import SelectedMonth from "./SelectedMonth";

const th = ["Categoría", "Proveedor", "Vencimiento", "Monto", "Estado", ""];

const TableHeader = () => (
  <thead className={styles.head}>
    <tr className={cx(styles.tr, { [styles.header]: true })}>
      {th.map(item => (
        <th key={item} className={styles.th}>
          <span>{item}</span>
          {item && <FaSort className={styles.sort} />}
        </th>
      ))}
    </tr>
  </thead>
);

const Table = ({ data = {}, loading }) => {
  const payments = Object.values(data);
  const ids = Object.keys(data);

  const noPayments = !ids.length && !loading;

  return (
    <div className={styles["table-container"]}>
      <SelectedMonth />
      <table className={styles.table}>
        <TableHeader />
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
