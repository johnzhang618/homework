import React, { useContext, useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  groupByDay,
  formatDateLabel,
  formatTimeLabel,
  arraySortByTime,
} from '../../utils/utils';
import { ReadingsContext } from '../../contexts/ReadingsContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
ChartJS.defaults.font.size = '10px';

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

const formatReadings = (chartState) => {
  // if (!(chartState.unit && chartState.range && chartState.readings)) return;
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
    values,
  };
};

const formatChartData = ({ labels, values }) => ({
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
});

function BarChart() {
  const { chartState } = useContext(ReadingsContext);
  const [chartData, setChartData] = useState(formatChartData(formatReadings(chartState)));

  useEffect(() => {
    setChartData(formatChartData(formatReadings(chartState)));
  }, [chartState]);

  return (
    <section className="chartHeight mb3">
      <Bar options={options} data={chartData} />
    </section>
  );
}
export default BarChart;
