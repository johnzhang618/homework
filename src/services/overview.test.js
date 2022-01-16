import { getGridState, getDevicesStates, fakeData } from './overview';

describe('#getGridState', () => {
  it('should not get incorrect data', async () => {
    // act
    const gridState = await getGridState();

    // assert
    Object.keys(gridState).forEach((key) => {
      expect(typeof gridState[key]).toBe('string');
      expect(typeof key).toBe('string');
      expect(gridState[key].length).toBe(3);
    });
  });
});

describe('#getDevicesStates', () => {
  it('should format as fakeData', async () => {
    // act
    const gridState = await getDevicesStates();

    // assert
    gridState.forEach((item, index) => {
      expect(item.name).toBe(fakeData.devices[index].name);
      expect(typeof item.value).toBe('string');
      expect(item.value.length).toBe(6);
    });
  });
});
