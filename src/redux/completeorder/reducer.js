import {
    COMPLETE_REQUEST,
    COMPLETE_SUCCESS,
    COMPLETE_FAILURE
} from './actionTypes.js';

const initialState = {
    dataRes: null,
    success: false,
    error: false,
    errorMessage: null
}

export default (state = initialState, action) => {

    switch (action.type) {
        case COMPLETE_REQUEST:
            return {
                ...state
            };
        case COMPLETE_SUCCESS:
            return {
                error: false,
                success: action.dataResult.status,
                dataRes: action.dataResult.date,
                errorMessage: action.dataResult.message,
            };
        case COMPLETE_FAILURE:
            return {
                ...state,
                error: true,
                success: false,
                errorMessage: 'Network Error (Không có kết nối mạng)'
            };
        default:
            return state;
    }
}