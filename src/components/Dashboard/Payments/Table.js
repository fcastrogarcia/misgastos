import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import cx from "classnames";
import get from "lodash/get";

import Payment from "./Payment";

const th = ["Categoría", "Proveedor", "Vencimiento", "Monto", "Estado", ""];

const TableHeader = () => (
  <thead className={styles.head}>
    <tr className={cx(styles.tr, { [styles.header]: true })}>
      {th.map(item => (
        <th key={item} className={styles.th}>
          {item}
        </th>
      ))}
    </tr>
  </thead>
);

export default ({ data = {} }) => {
  const payments = Object.values(data);
  const ids = Object.keys(data);
  // function shouldPaymentRender() {

  // }

  return (
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
  );
};
