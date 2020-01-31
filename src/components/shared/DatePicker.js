import React from "react";

import DatePicker from "react-date-picker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const DueDate = ({ className, handleChange, date, required }) => (
  <DatePicker
    className={className}
    value={date}
    onChange={handleChange}
    calendarIcon={<FaRegCalendarAlt />}
    clearIcon={<IoMdClose />}
    required={required}
  />
);

export default DueDate;
