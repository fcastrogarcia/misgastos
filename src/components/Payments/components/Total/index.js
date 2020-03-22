import React from "react";
import styles from "../../Table.module.scss";
import cx from "classnames";
import { object, arrayOf } from "prop-types";

import NumberFormat from "react-number-format";

import { getTotalAmount } from "../../utils";

const Total = ({ payments }) => {
  const filteredPayments = payments.filter(payment => payment.shouldRender);
  const totalAmount = getTotalAmount(filteredPayments);

  return (
    <tr className={styles["total-tr"]}>
      <td colSpan="3" className={cx(styles.td, styles["total-td"])}>
        Total
      </td>
      <td colSpan="3" className={cx(styles.td, styles["total-td"])}>
        <NumberFormat
          displayType="text"
          prefix="$"
          value={totalAmount}
          decimalSeparator={","}
          thousandSeparator={"."}
        />
      </td>
    </tr>
  );
};

Total.propTypes = {
  payments: arrayOf(object)
};

Total.defaultProps = {
  payments: {}
};

export default Total;
