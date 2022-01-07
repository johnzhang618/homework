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
  it('should get readings grouped by day', async () => {
    const readings = [
      {
        time: new Date(2021, 12, 17, 10, 24).getTime(),
        value: 50,
      },
      {
        time: new Date(2021, 12, 17, 9, 24).getTime(),
        value: 40,
      },
      {
        time: new Date(2021, 12, 16, 10, 34).getTime(),
        value: 35,
      },
      {
        time: new Date(2021, 12, 15, 11, 34).getTime(),
        value: 25,
      },
    ];

    const groupedReadings = groupByDay(readings, 'daily');
    expect(groupedReadings).toHaveLength(3);
    expect(
      groupedReadings.find(
        (reading) => reading.time === new Date(2021, 12, 17).getTime(),
      ).value,
    ).toBe(90);
    expect(
      groupedReadings.find(
        (reading) => reading.time === new Date(2021, 12, 16).getTime(),
      ).value,
    ).toBe(35);
  });
});

describe('#arraySortByTime', () => {
  it('should put latest reading to the last', () => {
    const readings = [
      {
        time: new Date(2021, 12, 17, 10, 24).getTime(),
        value: 50,
      },
      {
        time: new Date(2021, 12, 17, 9, 24).getTime(),
        value: 40,
      },
      {
        time: new Date(2021, 12, 17, 11, 34).getTime(),
        value: 35,
      },
      {
        time: new Date(2021, 12, 15, 11, 34).getTime(),
        value: 25,
      },
    ];

    const sortedReading = arraySortByTime(readings);
    expect(sortedReading).toHaveLength(4);
    expect(sortedReading[0]).toMatchObject({
      time: new Date(2021, 12, 15, 11, 34).getTime(),
      value: 25,
    });
    expect(sortedReading[3]).toMatchObject({
      time: new Date(2021, 12, 17, 11, 34).getTime(),
      value: 35,
    });
  });

  it('should not change original array', () => {
    const readings = [
      {
        time: new Date(2021, 12, 17, 10, 24).getTime(),
        value: 50,
      },
      {
        time: new Date(2021, 12, 17, 9, 24).getTime(),
        value: 40,
      },
      {
        time: new Date(2021, 12, 15, 11, 34).getTime(),
        value: 25,
      },
    ];

    const sortedReading = arraySortByTime(readings);
    expect(sortedReading).toHaveLength(3);
    expect(sortedReading).toEqual([
      {
        time: new Date(2021, 12, 15, 11, 34).getTime(),
        value: 25,
      },
      {
        time: new Date(2021, 12, 17, 9, 24).getTime(),
        value: 40,
      },
      {
        time: new Date(2021, 12, 17, 10, 24).getTime(),
        value: 50,
      },
    ]);
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
