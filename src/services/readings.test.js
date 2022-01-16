import { getReadings } from './readings';

describe('#getReadings', () => {
  describe('when called by a param', () => {
    it('should generate readings with specified length', async () => {
      // arrange
      const cases = [...new Array(2)].map((_, index) => {
        const start = new Date(2022, 0, 1, 0).getTime();
        const end = new Date(2022, 0, 1 * (1 + index), 23).getTime();
        const diff = parseInt((end - start) / (1000 * 60 * 60), 10);
        return {
          param: [start, end],
          expected: diff,
        };
      });

      // act
      const result = cases.map((item) => getReadings(...item.param));

      // assert
      // eslint-disable-next-line max-len
      result.forEach((item, index) => item.then((res) => expect(res).toHaveLength(cases[index].expected)));
    });

    it('should generate readings with timestamps and random values', async () => {
      // act
      const result = await getReadings();

      // assert
      result.forEach((item) => {
        expect(typeof item.time).toBe('number');
        expect(typeof item.value).toBe('number');
      });
    });

    it('should generate readings by hours and ordered by time descending', async () => {
      // arrange
      let current = 0;
      const OneHourInMilliseconds = 60 * 60 * 1000;

      // act
      const result = await getReadings();

      // assert  let current = 0;
      result.forEach((v, index) => {
        if (index === 0) {
          current = v.time;
          return;
        }
        expect(current - v.time).toBe(OneHourInMilliseconds);
        current = v.time;
      });
    });
  });
});
