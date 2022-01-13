export const readingsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ALL':
      return {
        start: action.start,
        end: action.end,
        unit: action.unit,
        range: action.range,
        readings: action.readings,
      };
    case 'UPDATE_STATE':
      return {
        start: action.start,
        end: action.end,
        unit: action.unit,
        range: action.range,
        readings: state.readings,
      };
    case 'UPDATE_READINGS':
      return {
        start: state.start,
        end: state.end,
        unit: state.unit,
        range: state.range,
        readings: action.readings,
      };
    default:
      return state;
  }
};
export default { readingsReducer };
