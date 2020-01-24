import React from "react";
import styles from "./Table.module.scss";
import cx from "classnames";

import NumberFormat from "react-number-format";

import { doFormatDate } from "../../../utils/masks";
import doCalculatePaymentState from "./doCalculatePaymentState";
import usePayments from "./usePayments";

const Payment = ({ index, item, timestamp, id }) => {
  const { toggleModal, setPaymentId } = usePayments();
  const paymentState = doCalculatePaymentState(item);

  function handleClick() {
    setPaymentId(id);
    toggleModal(true);
  }

  return (
    <React.Fragment>
      <tr key={index} className={styles.tr}>
        <td className={cx(styles.td)}>{item.category}</td>
        <td className={cx(styles.td)}>{item.provider}</td>
        <td className={cx(styles.td)}>{doFormatDate(timestamp)}</td>
        <td className={cx(styles.td)}>
          <NumberFormat
            displayType="text"
            prefix="$"
            value={item.amount}
            decimalSeparator={","}
            thousandSeparator={"."}
          />
        </td>
        <td className={cx(styles.td)}>{paymentState}</td>
        <td className={cx(styles.td)}>
          <button onClick={handleClick}>Registrar Pago</button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Payment;
