import {
  ADDRESS_REQUEST,
  ADDRESS_SUCCESS,
  ADDRESS_FAILURE,
} from './actionTypes.js';

const initialState = {
  dataRes: null,
  success: false,
  error: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_REQUEST:
      return {
        ...state,
      };
    case ADDRESS_SUCCESS:
      return {
        error: false,
        success: action.dataResult.status,
        dataRes: action.dataResult.store,
        errorMessage: action.dataResult.message,
      };
    case ADDRESS_FAILURE:
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
