/* eslint-disable no-undef */
import { overviewReducer } from './overviewReducer';
import { fakeData, getOverviewData } from '../services/overview';

describe('#overviewReducer', () => {
  it('should return as the overview', async () => {
    // arange
    const actionType = 'UPDATE_OVERVIEW';
    const state = fakeData;
    const overview = await getOverviewData();

    // act
    const result = overviewReducer(state, {
      type: actionType,
      overview,
    });

    // assert
    expect(result).toBe(overview);
  });

  it('should return as the original state', async () => {
    // arange
    const actionType = '';
    const state = fakeData;
    const overview = await getOverviewData();

    // act
    const result = overviewReducer(state, {
      type: actionType,
      overview,
    });

    // assert
    expect(result).toBe(state);
  });
});
