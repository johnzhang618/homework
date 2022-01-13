export const getReadings = async (end, length = 1200) => {
  const current = !end ? Date.now() : end;
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};
export default { getReadings };
