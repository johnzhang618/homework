import { getReadings } from './readings';

describe('#getReadings', () => {
  describe('when called by a param', () => {
    it('should generate readings with specified length', async () => {
      // arange
      const cases = [...new Array(9)].map((_, index) => index * Math.ceil(Math.random() * 100));

      // act
      const result = cases.map((item) => getReadings(item));

      // assert
      result.forEach((item, index) => item.then((res) => expect(res).toHaveLength(cases[index])));
    });
  });
  describe('when called without params', () => {
    // arange
    const target = 1200;

    it('should generate readings with default length', async () => {
      // act
      const result = await getReadings();

      // assert
      expect(result).toHaveLength(target);
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
      // arange
      let current = 1200;
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
