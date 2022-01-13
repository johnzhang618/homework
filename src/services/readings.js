export const getReadings = async (start, end) => {
  const hour = 1000 * 60 * 60;
  const readings = [];
  let i = 0;
  do {
    readings.push({
      time: end - (hour * i),
      value: Math.random() * 0.7 + 0.4,
    });
    i += 1;
  }
  while (end - (hour * i) > start);
  return readings;
};
export default { getReadings };
