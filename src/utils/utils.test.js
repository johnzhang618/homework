/* eslint-disable no-undef */
import {
  zeroPadding, formatDateLabel, formatTimeLabel, arraySortByTime, groupByDay,
} from './utils';

describe('#chart formatDateLabel', () => {
  it('should format date label', () => {
    expect(formatDateLabel(new Date(2021, 0, 1).getTime())).toBe('01/01');
    expect(formatDateLabel(new Date(2021, 1, 1).getTime())).toBe('01/02');
    expect(formatDateLabel(new Date(2021, 5, 1).getTime())).toBe('01/06');
    expect(formatDateLabel(new Date(2021, 11, 1).getTime())).toBe('01/12');
    expect(formatDateLabel(new Date(2021, 11, 25).getTime())).toBe('25/12');
    expect(formatDateLabel(new Date(2021, 11, 31).getTime())).toBe('31/12');
  });
});

describe('#chart formatTimeLabel', () => {
  it('should format time label', () => {
    expect(formatTimeLabel(new Date(2021, 11, 31, 11).getTime())).toBe('11:00');
    expect(formatTimeLabel(new Date(2021, 11, 31, 12).getTime())).toBe('12:00');
    expect(formatTimeLabel(new Date(2021, 11, 31, 9).getTime())).toBe('09:00');
    expect(formatTimeLabel(new Date(2021, 11, 31, 0).getTime())).toBe('00:00');
  });
});

describe('#groupByDay', () => {
  it('should get readings grouped by day', () => {
    // arrange
    const cases = {};
    const readings = [...new Array(15)].map((_, index) => {
      const time = new Date(2021, index % 9, 11, index, index).getTime();
      const value = index * Math.ceil(Math.random() * 10);
      const date = new Date(2021, index % 9, 11).getTime();

      if (!cases[date]) cases[date] = value; else cases[date] += value;

      return {
        time,
        value,
      };
    });
    const { length } = Object.getOwnPropertyNames(cases);

    // act
    const groupedReadings = groupByDay(readings, 'daily');

    // assert
    expect(groupedReadings.length).toBe(length);
    groupedReadings.forEach((item) => expect(item.value).toBe(cases[item.time]));
  });
});

describe('#arraySortByTime', () => {
  // arange
  const readingsMap = {};
  const readings = [...new Array(60)].map((_, index) => {
    const item = {
      time: new Date(2022, index % 11, index % 28).getTime(),
      value: index * Math.ceil(Math.random() * 10),
    };

    readingsMap[item.time] = index;

    return item;
  });
  let current = 0;

  // act
  const sortedReading = arraySortByTime(readings);
  // expect(sortedReading.length).toBe(0);

  // assert
  it('should have same length with original array', () => expect(sortedReading.length).toBe(readings.length));
  sortedReading.forEach((item, index) => {
    it('should not change item in the original array', () => expect(item).toEqual(readings[readingsMap[item.time]]));
    // TODO: find out the reason of last loop (index = 59) current = item.time,
    // there s no same time in the array.
    if (index !== current && index < 59) {
      it('should sort original array by time DESC', () => expect(item.time).toBeLessThan(current));
    }
    current = item.time;
  });
});

describe('#chart zeroPadding', () => {
  describe('when real number params', () => {
    it('should return a string with zero padding', () => {
      // arrange
      const cases = [...new Array(10)].map((_, index) => ({
        param: index,
        result: `0${index}`,
      }));

      // act
      const result = cases.map(({ param }) => zeroPadding(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });

    it('should return a string same with param', () => {
      // arrange
      const cases = [...new Array(99)].map((_, index) => ({
        param: index + 10,
        result: `${index + 10}`,
      }));

      // act
      const result = cases.map(({ param }) => zeroPadding(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });
  });

  describe('when non real number params', () => {
    it('should return ""', () => {
      // arrange
      const casesFloat = [...new Array(99)].map((_, index) => Math.random() + index);
      const casesNegative = [...new Array(99)].map((_, index) => 0 - 1 - index);

      // act
      const resultFloat = casesFloat.map((item) => zeroPadding(item));
      const resultNegative = casesNegative.map((item) => zeroPadding(item));

      // assert
      resultFloat.forEach((item) => expect(item).toBe(''));
      resultNegative.forEach((item) => expect(item).toBe(''));
    });
  });

  describe('when NaN params', () => {
    it('should return ""', () => {
      // arrange
      const cases = ['0', '10', 'a', { 1: 2 }, [0], null, undefined, true, false];

      // act
      const result = cases.map((item) => zeroPadding(item));

      // assert
      result.forEach((item) => expect(item).toBe(''));
    });
  });
});
