import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { InputGroup } from 'react-bootstrap';
import styles from './CustomDatePicker.module.css';

import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = (props) => {
  const [startDate, setStartDate] = useState(null);
  return (
    <InputGroup>
    <DatePicker
      className={styles.customDatePicker}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText="Select a date"
      required
      {...props}
    />
  </InputGroup>
  );
};

export default CustomDatePicker;