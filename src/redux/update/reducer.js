import {
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} from './actionTypes.js';

const initialState = {
  dataRes: null,
  success: false,
  error: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return {
        ...state,
      };
    case UPDATE_SUCCESS:
      return {
        error: false,
        success: action.dataResult.status,
        dataRes: action.dataResult.account,
        errorMessage: action.dataResult.message,
      };
    case UPDATE_FAILURE:
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
