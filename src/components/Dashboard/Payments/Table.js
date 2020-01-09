import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";
import cx from "classnames";
import keyGen from "../../../utils/keyGen";

const th = ["Categoría", "Proveedor", "Vencimiento", "Monto", "Estado", ""];

export default ({ data }) => {
  return (
    <React.Fragment>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr className={cx(styles.tr, { [styles.header]: true })}>
            {th.map(item => (
              <th key={item} className={styles.th}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={keyGen()} className={styles.tr}>
              <td className={cx(styles.td)}>{item.category}</td>
              <td className={cx(styles.td)}>{item.provider}</td>
              <td className={cx(styles.td)}>{item.due_date}</td>
              <td className={cx(styles.td)}>{item.amount}</td>
              <td className={cx(styles.td)}></td>
              <td className={cx(styles.td)}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
