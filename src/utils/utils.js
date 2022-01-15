export const zeroPadding = (value) => {
  if (typeof value !== 'number' || value % 1 !== 0 || value < 0) return '';
  return value < 10 ? `0${value}` : `${value}`;
};

export const arraySortByTime = (readings) => [...readings].sort(
  (readingA, readingB) => readingA.time - readingB.time,
);

export const formatDateLabel = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth();
  const day = date.getDate();
  return `${zeroPadding(day)}/${zeroPadding(month + 1)}`;
};

export const formatTimeLabel = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  return `${zeroPadding(hour)}:00`;
};

export const groupByDay = (readings) => {
  const groupedByDay = [];
  readings.forEach(({ time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate(),
    ).getTime();
    if (!groupedByDay[day]) groupedByDay[day] = 0;
    groupedByDay[day] += value;
  });
  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

export const getLastSecondInDay = (tmp) => {
  const date = new Date(tmp);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
  ).getTime();
};

export const getNDaysAgoTmp = (n, current) => {
  let nDaysBefore = new Date(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
  );
  nDaysBefore = nDaysBefore.setDate(nDaysBefore.getDate() - n);
  return nDaysBefore;
};

export default {
  groupByDay,
  formatTimeLabel,
  formatDateLabel,
  zeroPadding,
};
