import React from "react";
import styles from "./ScheduleSelector.module.scss";
import cx from "classnames";

import { FaRegCalendarAlt } from "react-icons/fa";

import { getCurrentTime } from "../../../utils/getCurrentTime";
import usePaymentsContext from "./usePaymentsContext";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const Month = ({ month, index }) => {
  const { time, setTime } = usePaymentsContext();

  function handleClick() {
    setTime({ type: "MONTH", payload: index });
  }

  return (
    <React.Fragment>
      <div
        className={cx(styles.item, { [styles.active]: index === time.month })}
        onClick={handleClick}
      >
        {month}
      </div>
    </React.Fragment>
  );
};

const Schedule = () => {
  const { time } = usePaymentsContext();

  const { month: currentMonth } = getCurrentTime();
  const hasMonthTranscurred = index => index < currentMonth + 1;

  return (
    <div className={styles.wrapper}>
      <FaRegCalendarAlt className={styles.icon} />
      <div className={styles.container}>
        {months.map(
          (month, index) =>
            hasMonthTranscurred(index) && (
              <Month month={month} index={index} key={index} />
            )
        )}
        <div className={cx(styles.item, styles.year)}>{time.year}</div>
      </div>
    </div>
  );
};

export default Schedule;
