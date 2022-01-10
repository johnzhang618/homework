/* eslint-disable no-undef */
import { readingsReducer } from './readingsReducer';

describe('#overviewReducer', () => {
  describe('when UPDATE_ALL', () => {
    it('should return all as the new', async () => {
      // arange
      const states = {
        unit: 2,
        range: 3,
        readings: [],
      };
      const cases = {
        type: 'UPDATE_ALL',
        unit: 4,
        range: 5,
        readings: [0],
      };

      // act
      const result = readingsReducer(states, cases);

      // assert
      expect(result.unit).toBe(cases.unit);
      expect(result.range).toBe(cases.range);
      expect(result.readings).toBe(cases.readings);
    });
  });

  describe('when UPDATE_STATE', () => {
    it('should return readings as the original states, and update the other states', async () => {
    // arange
      const states = {
        unit: 2,
        range: 3,
        readings: [1],
      };
      const cases = {
        type: 'UPDATE_STATE',
        unit: 4,
        range: 5,
        readings: [0],
      };

      // act
      const result = readingsReducer(states, cases);

      // assert
      expect(result.unit).toBe(cases.unit);
      expect(result.range).toBe(cases.range);
      expect(result.readings).toBe(states.readings);
    });
  });

  describe('when UPDATE_READINGS', () => {
    it('should return readings as the new readings, and hold the other original states', async () => {
    // arange
      const states = {
        unit: 2,
        range: 3,
        readings: [0],
      };
      const cases = {
        type: 'UPDATE_READINGS',
        unit: 4,
        range: 5,
        readings: [1],
      };

      // act
      const result = readingsReducer(states, cases);

      // assert
      expect(result.unit).toBe(states.unit);
      expect(result.range).toBe(states.range);
      expect(result.readings).toBe(cases.readings);
    });
  });

  describe('when default', () => {
    it('should return readings as the new readings, and hold the other original states', async () => {
    // arange
      const states = {
        unit: 2,
        range: 3,
        readings: [1],
      };
      const cases = {
        type: 'UPDATE_OVERVIEW',
        unit: 4,
        range: 5,
        readings: [0],
      };

      // act
      const result = readingsReducer(states, cases);

      // assert
      expect(result.unit).toBe(states.unit);
      expect(result.range).toBe(states.range);
      expect(result.readings).toBe(states.readings);
    });
  });
});
