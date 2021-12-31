
export const overviewReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_OVERVIEW':
            return [state, {
                overview: action.overview,
            }]
        case 'UPDATE_OVERVIEW':
            return [state, {
                overview: action.overview,
            }]
        default:
            return state;
    }
} 