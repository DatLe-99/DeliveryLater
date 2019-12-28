import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE} from './actionTypes.js';

const initialState = {
    dataRes: null,
    success: false,
    error: false,
    errorMessage: null
}

export default (state = initialState, action) => {

    switch (action.type) {
      case SEARCH_REQUEST:
        return {
          ...state,
        };
      case SEARCH_SUCCESS:
        return {
          error: false,
          success: action.dataResult.status,
          dataRes: action.dataResult.store,
          errorMessage: action.dataResult.message,
        };
      case SEARCH_FAILURE:
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