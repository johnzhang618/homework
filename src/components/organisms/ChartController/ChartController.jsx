import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ChartController.css';
import { Button } from '../../atoms';
import { getLastSecondInDay } from '../../../utils/utils';
import { DateInputs } from '../../molecules';

function ChartController({
  onChange,
  value,
}) {
  const [startDate, setStartDate] = useState(value.start);
  const [endDateFromChild, setEndDateFromChild] = useState(value.end);
  const [endDate, setEndDate] = useState(value.end);
  const [warning, setWarning] = useState();

  const warn = async (text) => {
    setWarning(text);
    setTimeout(() => {
      setWarning();
    }, 1000 * 5);
  };

  const onSubmit = () => {
    if (startDate > endDate) {
      warn('Place check the input DATE: start date should less than end date!');
      return;
    }
    onChange({
      start: startDate,
      end: endDate,
    });
  };

  useEffect(() => {
    const now = Date.now();
    const lastSecond = getLastSecondInDay(endDateFromChild);
    setEndDate(now > lastSecond ? lastSecond : now);
  }, [endDateFromChild]);

  return (
    <section className="mb3">
      <Button
        tabIndex="-1"
        type="button"
        className="
                h5
                inline-block
                shadow-2
                pl2
                pr2
                pt1
                pb1
                roundedMore
                border-grey
                bg-blue
                white
                bold
              "
      >
        Last 30 days
      </Button>
      <div className="inline col-right">
        <div className="container-input inline bg-white roundedMore p03 mr1 relative" warning={warning}>
          <DateInputs
            originDateTmp={startDate}
            onChange={setStartDate}
          />
          -
          <DateInputs
            originDateTmp={endDate}
            onChange={setEndDateFromChild}
          />
        </div>
        <Button
          tabIndex="-1"
          type="button"
          className="
                h5
                inline-block
                shadow-2
                pl2
                pr2
                pt1
                pb1
                roundedMore
                border-grey
                bg-blue
                white
                bold
              "
          onClick={onSubmit}
        >
          Search
        </Button>
      </div>
    </section>
  );
}
ChartController.propTypes = {
  value: PropTypes.objectOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};
export default ChartController;
