import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BarChart } from '../../atoms';
import { getReadings } from '../../../services/readings';
import {
  groupByDay,
  formatDateLabel,
  arraySortByTime,
} from '../../../utils/utils';

const options = {
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};
const format = (readings) => {
  const labels = [];
  const data = [];

  arraySortByTime(groupByDay(readings)).forEach(({ time, value }) => {
    labels.push(formatDateLabel(time));
    data.push(value);
  });

  return {
    labels,
    datasets: [
      {
        data,
        label: 'kWh usage',
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: '#5A8EDA',
        borderRadius: 10,
      },
    ],
  };
};

function UsageBarChart({ value }) {
  const [state, setState] = useState();

  useEffect(() => {
    const query = async () => {
      const readings = await getReadings(value.start, value.end);
      setState(format(readings));
    };
    query();
  }, [value]);

  return (
    <section className="chartHeight mb3">
      {
        state && <BarChart options={options} fontSize="10px" data={state} />
      }
    </section>
  );
}
UsageBarChart.propTypes = {
  value: PropTypes.objectOf(PropTypes.number).isRequired,
};
export default UsageBarChart;
