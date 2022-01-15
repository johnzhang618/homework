import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from '../../atoms';
import { getLastSecondInDay, getNDaysAgoTmp } from '../../../utils/utils';
import { DateSelectors } from '../../molecules';

function ChartController({
  onChange,
  value,
}) {
  const earliest = getNDaysAgoTmp(999, new Date());
  const [startDate, setStartDate] = useState(value.start);
  const [endDateFromChild, setEndDateFromChild] = useState(value.end);
  const [endDate, setEndDate] = useState(value.end);

  const onSubmit = () => {
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
        <div className="inline bg-white roundedMore p03 mr1">
          <DateSelectors
            dateRange={{
              latestTmp: endDate,
              earliestTmp: earliest,
            }}
            defaultTmp={startDate}
            onUpdate={setStartDate}
          />
          -
          <DateSelectors
            dateRange={{
              latestTmp: Date.now(),
              earliestTmp: startDate,
            }}
            defaultTmp={endDate}
            onUpdate={setEndDateFromChild}
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
