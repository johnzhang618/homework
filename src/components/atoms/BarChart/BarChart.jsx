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

function BarChart({
  options,
  format,
  fontSize,
}) {
  // TODO: need more options for extensibility in ChartJS register
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
  ChartJS.defaults.font.size = fontSize;

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
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  format: PropTypes.func.isRequired,
  fontSize: PropTypes.string.isRequired,
};

export default BarChart;
