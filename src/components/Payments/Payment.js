import React from "react";
import styles from "./Table.module.scss";
import cx from "classnames";

import NumberFormat from "react-number-format";
import { FiMoreVertical } from "react-icons/fi";
import Menu from "./Menu";

import { doFormatDate, doFormatEmptyFields } from "../../utils/masks";
import {
  getPaymentState,
  getStateClassname,
  isPendingFromPastMonths
} from "./utils";
import usePayments from "./usePayments";

const Payment = ({ index, item, timestamp, id }) => {
  const { time, menu, toggleMenu } = usePayments();

  const paymentState = getPaymentState(item, time);
  const cn = getStateClassname(paymentState);
  const isPending = isPendingFromPastMonths(paymentState, time);
  const isMenuOpen = id === menu;

  const handleClick = () =>
    !menu || !isMenuOpen ? toggleMenu(id) : toggleMenu(null);

  return (
    <React.Fragment>
      <tr key={index} className={styles.tr}>
        <td className={cx(styles.td)}>{item.category}</td>
        <td className={cx(styles.td)}>{doFormatEmptyFields(item.provider)}</td>
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
        <td className={cx(styles.td)}>
          <span
            className={cx(styles.state, styles[cn], {
              [styles.vencido]: isPending
            })}
          >
            {paymentState}
          </span>
        </td>
        <td className={cx(styles.td)}>
          <button onClick={handleClick}>
            <FiMoreVertical
              className={cx(styles.ellipsis, { [styles.active]: isMenuOpen })}
            />
          </button>
          {isMenuOpen && <Menu id={id} closeMenu={handleClick} />}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Payment;

//ponerle una sombra on hover al ellipsis
