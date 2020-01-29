import React from "react";
import styles from "./Table.module.scss";
import cx from "classnames";

import NumberFormat from "react-number-format";
import { FiMoreVertical } from "react-icons/fi";
import Menu from "./Menu";

import { doFormatDate, doFormatEmptyFields } from "../../utils/masks";
import {
  shouldPaymentRender,
  getPaymentStatus,
  getStatusClassname,
  isPendingFromPastMonths,
  getAmount
} from "./utils";
import usePayments from "./usePayments";

const Payment = ({ index, item, timestamp, id }) => {
  const { time, menu, toggleMenu } = usePayments();

  const status = getPaymentStatus(item, time);
  const cn = getStatusClassname(status);
  const isPending = isPendingFromPastMonths(status, time);
  const shouldRender = shouldPaymentRender(item, time);
  const isMenuOpen = id === menu;
  const amount = getAmount(item, time);
  console.log(item, amount);

  const handleClick = () =>
    !menu || !isMenuOpen ? toggleMenu(id) : toggleMenu(null);

  return (
    <React.Fragment>
      {shouldRender && (
        <tr key={index} className={styles.tr}>
          <td className={cx(styles.td)}>{item.category}</td>
          <td className={cx(styles.td)}>
            {doFormatEmptyFields(item.provider)}
          </td>
          <td className={cx(styles.td)}>{doFormatDate(timestamp)}</td>
          <td className={cx(styles.td)}>
            <NumberFormat
              displayType="text"
              prefix="$"
              value={amount}
              decimalSeparator={","}
              thousandSeparator={"."}
            />
          </td>
          <td className={cx(styles.td)}>
            <span
              className={cx(styles.status, styles[cn], {
                [styles.vencido]: isPending
              })}
            >
              {status}
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
      )}
    </React.Fragment>
  );
};

export default Payment;
