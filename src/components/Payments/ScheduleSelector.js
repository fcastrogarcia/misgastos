import React from "react";
import styles from "./ScheduleSelector.module.scss";
import cx from "classnames";

import { FaRegCalendarAlt } from "react-icons/fa";

import { months } from "../../utils/time";
import { countPaymentStatus, paymentsPerMonth } from "./utils";
import usePayments from "./usePayments";

const Month = ({ month, index }) => {
  const { time, updateTime, payments } = usePayments();

  const scheduleTime = {
    month: index,
    year: time.year
  };

  const p = paymentsPerMonth(payments, scheduleTime);
  const statusCount = countPaymentStatus(p, scheduleTime);
  const lapsed = statusCount["Vencido"];
  const aboutToLapse = statusCount["Vence pronto"];

  const handleClick = () => updateTime({ month: index });

  return (
    <div
      className={cx(styles.item, { [styles.active]: index === time.month })}
      onClick={handleClick}
    >
      {month}
      {lapsed > 0 && (
        <div className={cx(styles.notification, styles.lapsed)}>{lapsed}</div>
      )}
      {aboutToLapse > 0 && (
        <div className={cx(styles.notification, styles["about-to-lapse"])}>
          {aboutToLapse}
        </div>
      )}
    </div>
  );
};

const Schedule = () => {
  const { time } = usePayments();

  return (
    <div className={styles.wrapper}>
      <FaRegCalendarAlt className={styles.icon} />
      <div className={styles.container}>
        {months.map((month, index) => (
          <Month key={index} month={month} index={index} />
        ))}
        <div className={cx(styles.item, styles.year)}>{time.year}</div>
      </div>
    </div>
  );
};

export default Schedule;
