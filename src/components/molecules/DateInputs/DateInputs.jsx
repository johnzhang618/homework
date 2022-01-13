import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
} from '../../atoms';
import { timestampToDate, intStringToInt, isDateInRange } from '../../../utils/utils';

const warning = {
  outRange: 'Out of range: the date you entered is out of range!',
  wrongDate: 'Wrong date: the date you entered is incorrect!',
};

function DateInputs({
  data,
  dateType,
  onUpdate,
}) {
  const formatState = (currentTmp, change) => {
    const date = new Date(currentTmp);
    let tmp = currentTmp;
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    if (change) {
      switch (change.name) {
        case 'year':
          year = change.value;
          break;
        case 'month':
          month = change.value - 1;
          break;
        case 'day':
          day = change.value;
          break;
        default:
      }

      tmp = (new Date(year, month, day).getTime());
    }

    return {
      tmp,
      year,
      month,
      day,
    };
  };
  const current = timestampToDate(data);
  const [state, setState] = useState(formatState(data));

  const handleBlur = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (!value) return;

    value = intStringToInt(value);

    if (!value) {
      alert(warning.wrongDate);
      return;
    }

    const newDate = formatState(state.tmp, {
      name,
      value,
    });

    if (isDateInRange(newDate.tmp, 90)) {
      setState({
        tmp: newDate.tmp,
        year: newDate.year,
        month: newDate.month,
        day: newDate.day,
      });
      onUpdate(newDate.tmp, dateType);

      return;
    }

    alert(warning.outRange);
  };

  return (
    <>
      <Input
        className="border-none flex-auto bg-very-light-grey"
        onBlur={handleBlur}
        name="year"
        type="text"
        placeholder={current.year}
        size="4"
        maxLength="4"
      />
      /
      <Input
        className="border-none flex-auto bg-very-light-grey"
        onBlur={handleBlur}
        name="month"
        type="text"
        placeholder={current.month}
        size="2"
        maxLength="2"
      />
      /
      <Input
        className="border-none flex-auto bg-very-light-grey"
        onBlur={handleBlur}
        name="day"
        type="text"
        placeholder={current.date}
        size="2"
        maxLength="2"
      />
    </>
  );
}
DateInputs.propTypes = {
  data: PropTypes.number.isRequired,
  dateType: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default DateInputs;
