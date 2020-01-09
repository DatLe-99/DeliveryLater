import {
  GETREVIEW_REQUEST,
  GETREVIEW_SUCCESS,
  GETREVIEW_FAILURE,
} from './actionTypes.js';

const initialState = {
  dataRes: null,
  success: false,
  error: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETREVIEW_REQUEST:
      return {
        ...state,
      };
    case GETREVIEW_SUCCESS:
      return {
        error: false,
        success: action.dataResult.status,
        dataRes: action.dataResult.review,
        errorMessage: action.dataResult.message,
      };
    case GETREVIEW_FAILURE:
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
