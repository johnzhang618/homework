import React from 'react';
import { BarChart } from '../../atoms';
import {
  groupByDay,
  formatDateLabel,
  formatTimeLabel,
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
const format = (chartState) => {
  const read = {
    hourly: () => {
      const readings = arraySortByTime(
        chartState.readings.slice(0, chartState.range),
      );
      return {
        labels: readings.map(({ time }) => formatTimeLabel(time)),
        readings,
      };
    },
    daily: () => {
      const readings = arraySortByTime(
        groupByDay(chartState.readings.slice(0, chartState.range * 24)),
      ).slice(0 - chartState.range);
      return {
        labels: readings.map(({ time }) => formatDateLabel(time)),
        readings,
      };
    },
  };
  const { labels, readings } = read[chartState.unit]();
  const values = readings.map(({ value }) => value);
  return {
    labels,
    datasets: [
      {
        label: 'kWh usage',
        data: values,
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

function UsageBarChart() {
  return (
    <section className="chartHeight mb3">
      <BarChart options={options} fontSize="10px" format={format} />
    </section>
  );
}

export default UsageBarChart;
