import {NEWEST_REQUEST, NEWEST_SUCCESS, NEWEST_FAILURE} from './actionTypes.js';

const initialState = {
    dataRes: null,
    success: false,
    error: false,
    errorMessage: null
}

export default (state = initialState, action) => {

    switch (action.type) {
      case NEWEST_REQUEST:
        return {
          ...state,
        };
      case NEWEST_SUCCESS:
        return {
          error: false,
          success: action.dataResult.status,
          dataRes: action.dataResult.store,
          errorMessage: action.dataResult.message,
        };
      case NEWEST_FAILURE:
        return {
          ...state,
          error: true,
          success: false,
          errorMessage: 'Network Error (Không có kết nối mạng)',
        };
      default:
        return state;
    }
}

