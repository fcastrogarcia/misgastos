import React from "react";
import styles from "./Table.module.scss";
import cx from "classnames";

import { FaSort } from "react-icons/fa";

const th = ["Categoría", "Proveedor", "Vencimiento", "Monto", "Estado", ""];

const TableHeader = ({ dispatch }) => (
  <thead className={styles.head}>
    <tr className={cx(styles.tr, { [styles.header]: true })}>
      {th.map(item => (
        <th key={item} className={styles.th}>
          <span
            onClick={() => dispatch({ type: item.toUpperCase() })}
            className="pointer"
          >
            <span>{item}</span>
            {item && <FaSort className={styles.sort} />}
          </span>
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
