import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
} from '../../atoms';
import { getDiffBtwDays, getLastSecondInDay } from '../../../utils/utils';
import { DateInputs } from '../../molecules';
import { ReadingsContext } from '../../../contexts/ReadingsContext';
import { getReadings } from '../../../services/readings';

function ChartController() {
  const {
    chartState,
    dispatch,
  } = useContext(ReadingsContext);
  const [startDate, setStartDate] = useState(chartState.start);
  const [endDateFromChild, setEndDateFromChild] = useState(chartState.end);
  const [endDate, setEndDate] = useState(chartState.end);

  const onSubmit = async () => {
    const range = getDiffBtwDays(startDate, endDate);
    const readings = await getReadings(endDate, range * 24);
    dispatch({
      type: 'UPDATE_ALL',
      start: startDate,
      end: endDate,
      unit: chartState.unit,
      range,
      readings,
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
        <DateInputs
          originDateTmp={startDate}
          onChange={setStartDate}
        />
        -
        <DateInputs
          originDateTmp={endDate}
          onChange={setEndDateFromChild}
        />
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

export default ChartController;
