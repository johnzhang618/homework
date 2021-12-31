
export const readingsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_READINGS':
            return [state, {
                value: action.readings.value,
                unit: action.readings.unit,
                range: action.readings.range
            }]
        case 'UPDATE_READINGS':
            return [state, {
                value: action.readings.value
            }]
        case 'UPDATE_STATE':
            return [state, {
                unit: action.readings.unit,
                range: action.readings.range
            }]
        default:
            return state;
    }
} 