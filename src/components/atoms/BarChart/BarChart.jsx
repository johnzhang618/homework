import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ReadingsContext } from '../../../contexts/ReadingsContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
ChartJS.defaults.font.size = '10px';

function BarChart({
  options,
  format,
}) {
  const { chartState } = useContext(ReadingsContext);
  const [chartData, setChartData] = useState(format(chartState));

  useEffect(() => {
    setChartData(format(chartState));
  }, [chartState, format]);

  return (
    <Bar options={options} data={chartData} />
  );
}
BarChart.propTypes = {
  options: PropTypes.instanceOf().isRequired,
  format: PropTypes.func.isRequired,
};

export default BarChart;
