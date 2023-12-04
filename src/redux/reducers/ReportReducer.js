const initialState = {
    data: [],
    total: null,
};

export default function reportReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_REPORT_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload.data,
                total: action.payload.total !== undefined ? action.payload.total : state.total
            };
        default:
            return state;
    }
}