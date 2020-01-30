import React from "react";

import DatePicker from "react-date-picker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const DueDate = ({ handleChange, date, text, style, required }) => (
  <div className={style}>
    <h3 className="section-subheading">{text}</h3>
    <DatePicker
      value={date}
      onChange={handleChange}
      calendarIcon={<FaRegCalendarAlt />}
      clearIcon={<FaTimes />}
      required={required}
    />
  </div>
);

export default DueDate;
