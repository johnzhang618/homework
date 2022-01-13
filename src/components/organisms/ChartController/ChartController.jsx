import React, { useContext, useState } from 'react';
import {
  Button,
} from '../../atoms';
import { getDiffBtwDays } from '../../../utils/utils';
import { DateInputs } from '../../molecules';
import { ReadingsContext } from '../../../contexts/ReadingsContext';
import { getReadings } from '../../../services/readings';

function ChartController() {
  const {
    chartState,
    dispatch,
  } = useContext(ReadingsContext);
  const [dates, setDates] = useState({
    start: chartState.start,
    end: chartState.end,
    unit: chartState.unit,
    range: chartState.range,
  });

  const onSubmit = async () => {
    const range = getDiffBtwDays(dates.start, dates.end);
    const readings = await getReadings(dates.end, range * 24);
    dispatch({
      type: 'UPDATE_ALL',
      start: dates.start,
      end: dates.end,
      unit: dates.unit,
      range,
      readings,
    });
  };

  const updateState = (tmp, type) => {
    switch (type) {
      case 'start':
        setDates({
          start: tmp,
          end: dates.end,
          unit: dates.unit,
          range: dates.range,
        });
        break;
      case 'end':
        setDates({
          start: dates.start,
          end: tmp,
          unit: dates.unit,
          range: dates.range,
        });
        break;
      default:
    }
  };

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
          data={chartState.start}
          dateType="start"
          onUpdate={updateState}
        />
        -
        <DateInputs
          data={chartState.end}
          dateType="end"
          onUpdate={updateState}
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
