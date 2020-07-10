import React from "react";
import cx from "classnames";
import styles from "./Footer.module.scss";
import { object, arrayOf } from "prop-types";

import NumberFormat from "react-number-format";

import { getTotalAmount, getAmountByStatus } from "../../utils";

const Footer = ({ payments }) => {
  const filteredPayments = payments.filter((payment) => payment.shouldRender);
  const totalAmount = getTotalAmount(filteredPayments);
  const paidAmount = getAmountByStatus(filteredPayments, "Pagado");
  const dueAmount = getAmountByStatus(filteredPayments, "Pendiente");
  const aboutToLapseAmount = getAmountByStatus(
    filteredPayments,
    "Vence pronto"
  );

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
            value={dueAmount + aboutToLapseAmount}
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
