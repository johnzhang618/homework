export const overviewReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_OVERVIEW':
      return action.overview;
    default:
      return state;
  }
};
export default { overviewReducer };
