import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Selector } from '../../atoms';

function DateSelectors({
  dateRange,
  defaultTmp,
  onUpdate,
}) {
  const daysInMonth = {
    nonLeap: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    leap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  };

  const latestDate = new Date(dateRange.latestTmp);
  const latestYear = latestDate.getFullYear();
  const latestMonth = latestDate.getMonth();
  const latestDay = latestDate.getDate();

  const earliestDate = new Date(dateRange.earliestTmp);
  const earliestYear = earliestDate.getFullYear();
  const earliestMonth = earliestDate.getMonth();
  const earliestDay = earliestDate.getDate();

  const [year, setYear] = useState(new Date(defaultTmp).getFullYear());
  const [month, setMonth] = useState(new Date(defaultTmp).getMonth());
  const [day, setDay] = useState(new Date(defaultTmp).getDate());

  const getDayOpts = () => {
    let days = year % 4 === 0 ? daysInMonth.leap[month] : daysInMonth.nonLeap[month];
    let start = 1;
    if (year === latestYear && month === latestMonth) {
      days = latestDay;
    }
    if (year === earliestYear && month === earliestMonth) {
      days -= earliestDay - 1;
      start = earliestDay;
    }
    return [...new Array(days)].map((_, index) => `${start + index}`);
  };
  const getMonthOpts = () => {
    let months = 12;
    let start = 1;
    if (year === latestYear) {
      months = latestMonth + 1;
    }
    if (year === earliestYear) {
      months -= earliestMonth;
      start = earliestMonth + 1;
    }
    return [...new Array(months)].map((_, index) => `${start + index}`);
  };

  const handleYearChange = (y) => {
    if (y === earliestYear) {
      if (month < earliestMonth) {
        setMonth(earliestMonth);
      }
      if (day < earliestDay) {
        setDay(earliestDay);
      }
    }
    if (y === latestYear) {
      if (month > latestMonth) {
        setMonth(latestMonth);
      }
      if (day > latestDay) {
        setDay(latestDay);
      }
    }
    setYear(y);
  };
  const handleMonthChange = (m) => {
    if (year === earliestYear && m === earliestMonth && day < earliestDay) {
      setDay(earliestDay);
    }
    if (year === latestYear && m === latestMonth && day > latestDay) {
      setDay(latestDay);
    }
    setMonth(m);
  };

  const yearOpts = [...new Array(latestYear - earliestYear + 1)].map(
    (_, index) => `${earliestYear + index}`,
  );
  const monthOpts = getMonthOpts();
  const dayOpts = getDayOpts();

  useEffect(() => {
    onUpdate(new Date(year, month, day).getTime());
  }, [year, month, day]);

  return (
    <div className="inline mx1">
      <Selector
        className="date-selector"
        onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
        options={yearOpts}
        value={year}
        width="4"
      />
      /
      <Selector
        className="date-selector"
        onChange={(e) => handleMonthChange(parseInt(e.target.value, 10) - 1)}
        options={monthOpts}
        value={month + 1}
        width="2"
      />
      /
      <Selector
        className="date-selector"
        onChange={(e) => setDay(parseInt(e.target.value, 10))}
        options={dayOpts}
        value={day}
      />
    </div>
  );
}
DateSelectors.propTypes = {
  dateRange: PropTypes.objectOf(PropTypes.number).isRequired,
  defaultTmp: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default DateSelectors;
