import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
} from './actionTypes.js';

const initialState = {
  dataRes: null,
  success: false,
  error: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
      };
    case ORDER_SUCCESS:
      return {
        error: false,
        success: action.dataResult.status,
        dataRes: action.dataResult,
        errorMessage: action.dataResult.message,
      };
    case ORDER_FAILURE:
      return {
        ...state,
        error: true,
        success: false,
        errorMessage: 'Network Error (Không có kết nối mạng)',
      };
    default:
      return state;
  }
};
