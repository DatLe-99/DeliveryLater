import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} from './actionTypes.js';

const initialState = {
    dataRes: null,
    success: false,
    error: false,
    errorMessage: null
}

export default (state = initialState, action) => {

    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {
                ...state
            };
        case SIGN_IN_SUCCESS:
            return {
                error: false,
                success: action.dataResult.status,
                dataRes: action.dataResult.account,
                //loginUserProfile: action.dataResult.account,
                errorMessage: action.dataResult.message,
            };
        case SIGN_IN_FAILURE:
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