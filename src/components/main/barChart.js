import React, { useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
);
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

const lll = [
    "02/12",
    "03/12",
    "04/12",
    "05/12",
    "06/12",
    "07/12",
    "08/12",
    "09/12",
    "10/12",
    "11/12",
    "12/12",
    "13/12",
    "14/12",
    "15/12",
    "16/12",
    "17/12",
    "18/12",
    "19/12",
    "20/12",
    "21/12",
    "22/12",
    "23/12",
    "24/12",
    "25/12",
    "26/12",
    "27/12",
    "28/12",
    "29/12",
    "30/12",
    "31/12"
];
const ddd = [
    17.350633765716022,
    16.968860942181106,
    16.94638160214328,
    17.78583455617963,
    18.91367659831726,
    18.550304499629938,
    16.904690131920834,
    17.258642570052654,
    18.906251186604617,
    19.238266922758932,
    18.459532917213547,
    19.28433907748913,
    18.02798334395273,
    19.199904715066364,
    20.45426256813081,
    17.963439565044006,
    16.65282996715779,
    17.45959163183509,
    16.700300287757898,
    17.89854336910667,
    19.271731894203416,
    19.714413146010006,
    18.461198990806814,
    17.766238413180833,
    17.428988825924904,
    19.066816911935973,
    16.62474279676646,
    17.907789632345942,
    17.26273934738868,
    1.560497103584257
];

const formatChartData = (labels, values) => {
    return {
        labels,
        datasets: [
            {
                label: "kWh usage",
                data: values,
                fill: true,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                borderWidth: 0.2,
                backgroundColor: "#5A8EDA",
                borderRadius: 10,
            },
        ],
    }
};

// const getChartData = (range, unit) => {

//     const unitSet = {
//         "hourly": 1,
//         "daily": 1 * 24
//     };

//     let rangeByHour = range * unitSet[unit];

//     rangeByHour = rangeByHour % unitSet[unit] != 0 ?
//         rangeByHour - (rangeByHour % unitSet[unit]) :
//         rangeByHour;

//     const
//         readings = getReadings(rangeByHour),
//         chartData = groupByFormat(sortByTime(readings), unit),
//         labels = unit > 1 ?
//             chartData.map(({ time }) => formatDateLabel(time)) :
//             chartData.map(({ time }) => formatTimeLabel(time)),
//         values = chartData.map(({ value }) => value);

//     return labels, values

// }

const BarChart = (props) => {
    const data = formatChartData(lll, ddd);
    // useEffect(() => {
    //     // const { readings } = useContext(ReadingsContext),
    //     //     { labels, values } = getChartData(readings.range, readings.unit);
    //     data = 
    // });

    return (
        <section className="chartHeight mb3">
            <Bar options={options} data={data} />
        </section>
    );
}
export default BarChart
