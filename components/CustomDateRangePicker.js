import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { InputGroup } from 'react-bootstrap';
import styles from './CustomDatePicker.module.css';

import 'react-datepicker/dist/react-datepicker.css';

const CustomDateRangePicker = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (props.onDateRangeChange) {
      props.onDateRangeChange(date, endDate);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (props.onDateRangeChange) {
      props.onDateRangeChange(startDate, date);
    }
  };

  return (
    <div className={styles.dateRangeWrapper}>
      <InputGroup>
        <DatePicker
          className={styles.customDatePicker}
          selected={startDate}
          onChange={handleStartDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsStart
          placeholderText="Start date"
          required
          {...props}
        />
      </InputGroup>
      <InputGroup>
        <DatePicker
          className={styles.customDatePicker}
          selected={endDate}
          onChange={handleEndDateChange}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          selectsEnd
          placeholderText="End date"
          required
          {...props}
        />
      </InputGroup>
    </div>
  );
};

export default CustomDateRangePicker;