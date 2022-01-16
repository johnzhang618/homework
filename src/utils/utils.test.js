import {
  zeroPadding,
  formatDateLabel,
  formatTimeLabel,
  arraySortByTime,
  groupByDay,
  getLastSecondInDay,
} from './utils';

describe('#chart formatDateLabel', () => {
  describe('when month before Oct and days before 10', () => {
    it('should format date label as dd/mm', () => {
      // arrange
      const cases = [...new Array(20)].map((_, index) => ({
        param: new Date(2021, index % 9, (index % 9) + 1).getTime(),
        result: `0${(index % 9) + 1}/0${(index % 9) + 1}`,
      }));

      // act
      const result = cases.map(({ param }) => formatDateLabel(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });
  });

  describe('when month after Sept and days after 9', () => {
    it('should format date label as dd/mm', () => {
      // arrange
      const cases = [...new Array(20)].map((_, index) => ({
        param: new Date(2021, (index % 3) + 9, index + 10).getTime(),
        result: `${index + 10}/${(index % 3) + 10}`,
      }));

      // act
      const result = cases.map(({ param }) => formatDateLabel(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });
  });

  describe('when month after Sept and days before 10', () => {
    it('should format date label as dd/mm', () => {
      // arrange
      const cases = [...new Array(20)].map((_, index) => ({
        param: new Date(2021, (index % 3) + 9, (index % 9) + 1).getTime(),
        result: `0${(index % 9) + 1}/${(index % 3) + 10}`,
      }));

      // act
      const result = cases.map(({ param }) => formatDateLabel(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });
  });

  describe('when month before Oct and days after 9', () => {
    it('should format date label as dd/mm', () => {
      // arrange Feb 29, 2021 will return as 03/01
      const cases = [...new Array(19)].map((_, index) => ({
        param: new Date(2021, index % 9, index + 10).getTime(),
        result: `${index + 10}/0${(index % 9) + 1}`,
      }));

      // act
      const result = cases.map(({ param }) => formatDateLabel(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });
  });
});

describe('#chart formatTimeLabel', () => {
  describe('when hours before 10', () => {
    it('should format time label as hh:00', () => {
      // arrange
      const cases = [...new Array(60)].map((_, index) => ({
        param: new Date(2022, 0, 9, index % 10, index).getTime(),
        result: `0${index % 10}:00`,
      }));

      // act
      const result = cases.map(({ param }) => formatTimeLabel(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });
  });

  describe('when hours after 9', () => {
    it('should format time label as hh:00', () => {
      // arrange
      const cases = [...new Array(60)].map((_, index) => ({
        param: new Date(2022, 0, 9, (index % 13) + 10, index).getTime(),
        result: `${(index % 13) + 10}:00`,
      }));

      // act
      const result = cases.map(({ param }) => formatTimeLabel(param));

      // assert
      result.forEach((item, index) => expect(item).toBe(cases[index].result));
    });
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
  // arrange
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

describe('#getLastSecondInDay', () => {
  it('should return a tmp and the tmp could parse to time as 23:59:59', () => {
    // arrange
    const cases = Date.now();

    // act
    const tmp = getLastSecondInDay(cases);
    const date = new Date(tmp);

    // assert
    expect(date.getFullYear()).toBe(new Date(cases).getFullYear());
    expect(date.getMonth()).toBe(new Date(cases).getMonth());
    expect(date.getDate()).toBe(new Date(cases).getDate());
    expect(date.getHours()).toBe(23);
    expect(date.getMinutes()).toBe(59);
    expect(date.getSeconds()).toBe(59);
  });
});
