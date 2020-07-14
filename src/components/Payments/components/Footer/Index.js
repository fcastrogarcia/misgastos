import React from "react";
import cx from "classnames";
import styles from "./Footer.module.scss";
import { object, arrayOf } from "prop-types";

import NumberFormat from "react-number-format";

import { getTotalAmount, getAmountByStatus } from "../../utils";

const Footer = ({ payments }) => {
  const filteredPayments = payments.filter((payment) => payment.shouldRender);
  const totalAmount = getTotalAmount(filteredPayments);
  const status = ["Vence pronto", "Pendiente", "Vencido"];
  const dueAmount = status.reduce(
    (acc, curr) => getAmountByStatus(filteredPayments, curr) + acc,
    0
  );
  const paidAmount = getAmountByStatus(filteredPayments, "Pagado");

  return (
    <div className={styles.footer}>
      <div className={styles["price-container"]}>
        <h3 className={styles.title}>Total del mes:</h3>
        {!totalAmount ? (
          <div className={styles.hyphen}>-</div>
        ) : (
          <NumberFormat
            displayType="text"
            prefix="$"
            value={totalAmount}
            decimalSeparator={","}
            thousandSeparator={"."}
            className={styles.value}
          />
        )}
      </div>
      <div className={styles["price-container"]}>
        <h3 className={styles.title}>Pagado:</h3>
        {!paidAmount ? (
          <div className={styles.hyphen}>-</div>
        ) : (
          <NumberFormat
            displayType="text"
            prefix="$"
            value={paidAmount}
            decimalSeparator={","}
            thousandSeparator={"."}
            className={styles.value}
          />
        )}
      </div>
      <div className={styles["price-container"]}>
        <h3 className={styles.title}>Por pagar:</h3>
        {!dueAmount ? (
          <div className={styles.hyphen}>-</div>
        ) : (
          <NumberFormat
            displayType="text"
            prefix="$"
            value={dueAmount}
            decimalSeparator={","}
            thousandSeparator={"."}
            className={cx(styles.value, styles["--red"])}
          />
        )}
      </div>
    </div>
  );
};

Footer.propTypes = {
  payments: arrayOf(object),
};

Footer.defaultProps = {
  payments: {},
};

export default Footer;
