import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
} from '../../atoms';
import {
  timestampToDate,
} from '../../../utils/utils';

// const warning = {
//   outRange: 'Out of range: the date you entered is out of range!',
//   wrongDate: 'Wrong date: the date you entered is incorrect!',
// };

function DateInputs({
  originDateTmp,
  onChange,
}) {
  const originDate = timestampToDate(originDateTmp);
  const [year, setYear] = useState(originDate.year);
  const [month, setMonth] = useState(originDate.month);
  const [day, setDay] = useState(originDate.day);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'year':
        setYear(value);
        break;
      case 'month':
        setMonth(value);
        break;
      case 'day':
        setDay(value);
        break;
      default:
    }
  };

  useEffect(() => {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10) - 1;
    const d = parseInt(day, 10);
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (y < 1970 || m < 0 || m > 11 || d < 0) {
      // TODO: warning
      return;
    }

    if (y % 4 !== 0 || m !== 1) {
      if (d > daysInMonth[m]) {
        // TODO: warning
        return;
      }
    } else if (d > 29) {
      // TODO: warning
      return;
    }
    onChange(new Date(y, m, d).getTime());
  }, [year, month, day, onChange]);

  return (
    <>
      <Input
        className="border-none flex-auto bg-very-light-grey"
        onChange={handleChange}
        onInput={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, ''); }}
        name="year"
        type="text"
        placeholder={originDate.year}
        size="4"
        maxLength="4"
      />
      /
      <Input
        className="border-none flex-auto bg-very-light-grey"
        onChange={handleChange}
        onInput={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, ''); }}
        name="month"
        type="text"
        placeholder={originDate.month}
        size="2"
        maxLength="2"
      />
      /
      <Input
        className="border-none flex-auto bg-very-light-grey"
        onChange={handleChange}
        onInput={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, ''); }}
        name="day"
        type="text"
        placeholder={originDate.day}
        size="2"
        maxLength="2"
      />
    </>
  );
}
DateInputs.propTypes = {
  originDateTmp: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default DateInputs;
