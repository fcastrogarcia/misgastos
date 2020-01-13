import React from "react";

import DatePicker from "react-date-picker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const DueDate = ({ setPayment, date }) => {
  const currentDate = new Date();

  function handleChange(date) {
    const newData = { due_date: date };
    setPayment(newData);
  }

  return (
    <div>
      <h3 className="section-subheading">Agendá el vencimiento (opcional)</h3>
      <DatePicker
        value={date}
        onChange={handleChange}
        calendarIcon={<FaRegCalendarAlt />}
        clearIcon={<FaTimes />}
        minDate={currentDate}
      />
    </div>
  );
};

export default DueDate;
