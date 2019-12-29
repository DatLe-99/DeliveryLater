import {RECOMMEND_REQUEST, RECOMMEND_SUCCESS, RECOMMEND_FAILURE} from './actionTypes.js';

const initialState = {
    dataRes: null,
    success: false,
    error: false,
    errorMessage: null
}

export default (state = initialState, action) => {

    switch (action.type) {
      case RECOMMEND_REQUEST:
        return {
          ...state,
        };
      case RECOMMEND_SUCCESS:
        return {
          error: false,
          success: action.dataResult.status,
          dataRes: action.dataResult.store,
          errorMessage: action.dataResult.message,
        };
      case RECOMMEND_FAILURE:
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