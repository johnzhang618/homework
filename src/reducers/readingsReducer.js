const readingsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ALL':
      return {
        unit: action.unit,
        range: action.range,
        readings: action.readings,
      };
    case 'UPDATE_STATE':
      return {
        unit: action.unit,
        range: action.range,
        readings: state.readings,
      };
    case 'UPDATE_READINGS':
      return {
        unit: state.unit,
        range: state.range,
        readings: action.readings,
      };
    default:
      return state;
  }
};
export default { readingsReducer };
