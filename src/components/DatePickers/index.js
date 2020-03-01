import React, { useState } from "react";
import cx from "classnames";
import styles from "./DatePicker.module.scss";

import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";

import { months } from "../../utils/time";
import usePayments from "../Payments/usePayments";

const MonthsList = ({ updateTime, setOpen, time }) => {
  return (
    <div className={styles["months-list"]}>
      <div className={styles.year}>
        <FiChevronLeft className={styles.chevron} />
        {time.year}
        <FiChevronRight className={styles.chevron} />
      </div>
      {months.map((month, index) => {
        const handleClick = () => {
          updateTime({ month: index });
          setOpen(false);
        };
        return (
          <div key={index} className={styles.month} onClick={handleClick}>
            {month}
          </div>
        );
      })}
    </div>
  );
};

const DatePicker = () => {
  const [open, setOpen] = useState(false);
  const { time, updateTime } = usePayments();

  const selectNextMonth = () =>
    updateTime({ month: time.month < 11 ? time.month + 1 : time.month });

  const selectPrevMonth = () =>
    updateTime({ month: time.month > 0 ? time.month - 1 : time.month });

  return (
    <div className={cx(styles.container, styles.mobile)}>
      <FaRegCalendarAlt
        className={styles.icon}
        onClick={() => setOpen(!open)}
      />
      <div className={styles.wrapper}>
        <FiChevronLeft className={styles.chevron} onClick={selectPrevMonth} />
        <span>{months[time.month]}</span>
        <FiChevronRight className={styles.chevron} onClick={selectNextMonth} />
      </div>
      {open && (
        <MonthsList updateTime={updateTime} setOpen={setOpen} time={time} />
      )}
    </div>
  );
};

export default DatePicker;
