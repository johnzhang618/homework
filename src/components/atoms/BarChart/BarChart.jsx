import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function BarChart({
  options,
  data,
  fontSize,
}) {
  // TODO: need more options for extensibility in ChartJS register
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
  ChartJS.defaults.font.size = fontSize;

  return (
    <Bar options={options} data={data} />
  );
}
BarChart.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  fontSize: PropTypes.string.isRequired,
};

export default BarChart;
