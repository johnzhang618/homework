import React, { useContext, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  groupByDay,
  formatDateLabel,
  formatTimeLabel,
  arraySortByTime,
} from "../../utils/utils";
import { ReadingsContext } from "../../contexts/ReadingsContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
ChartJS.defaults.font.size = "10px";

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
  const unitSet = {
    hourly: 1,
    daily: 1 * 24,
  };
  const unit = unitSet[chartState.unit];
  const rangeByHour = chartState.range * unit;
  const readings =
    unit > 1
      ? arraySortByTime(
          groupByDay(
            chartState.readings.slice(
              0,
              rangeByHour - (24 - new Date().getHours() - 1)
            )
          )
        )
      : arraySortByTime(chartState.readings.slice(0, rangeByHour));
  const labels =
    unit > 1
      ? readings.map(({ time }) => formatDateLabel(time))
      : readings.map(({ time }) => formatTimeLabel(time));
  const values = readings.map(({ value }) => value);
  return {
    labels,
    values,
  };
};

const formatChartData = (readings) => {
  // if (!readings) return;
  return {
    labels: readings.labels,
    datasets: [
      {
        label: "kWh usage",
        data: readings.values,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 0.2,
        backgroundColor: "#5A8EDA",
        borderRadius: 10,
      },
    ],
  };
};

function BarChart() {
  const { chartState } = useContext(ReadingsContext);
  const [chartData] = useState(formatChartData(formatReadings(chartState)));
  return (
    <section className="chartHeight mb3">
      {chartData && <Bar options={options} data={chartData} />}
    </section>
  );
}
export default BarChart;
