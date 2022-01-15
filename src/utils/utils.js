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
  // TODO: ⬇ has error with Assignment to property of function parameter
  // const groupedByDay = readings.reduce((curr, { time, value }) => {
  //   const readingDate = new Date(time);
  //   const day = new Date(
  //     readingDate.getFullYear(),
  //     readingDate.getMonth(),
  //     readingDate.getDate(),
  //   ).getTime();
  //   if (!curr[day]) curr[day] = 0;
  //   curr[day] += value;
  //   return curr;
  // }, {});
  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

export const timestampToDate = (tmp) => {
  const date = new Date(tmp);
  return {
    year: `${date.getFullYear()}`,
    month: zeroPadding(date.getMonth() + 1),
    day: zeroPadding(date.getDate()),
  };
};

export const intStringToInt = (intString) => {
  let result = NaN;

  if (typeof intString !== 'string') return result;

  result = 0 + intString;

  if (result % 1 !== 0) return NaN;

  return result;
};

export const isDateInRange = (tmp, range) => {
  const today = new Date();
  let earliest = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  earliest = earliest.setDate(earliest.getDate() - range);

  if (new Date(earliest).getTime() > tmp || new Date(today).getTime() < tmp) return false;

  return true;
};

export const getDiffBtwDays = (start, end) => Math.ceil((end - start) / 1000 / 60 / 60 / 24);

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
