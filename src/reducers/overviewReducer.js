const overviewReducer = (state, action) => {
  switch (action.type) {
    case "ADD_OVERVIEW":
      return action.overview;
    case "UPDATE_OVERVIEW":
      return action.overview;
    default:
      return state;
  }
};

export default overviewReducer;
