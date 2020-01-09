import {
  REVIEWSEND_REQUEST,
  REVIEWSEND_SUCCESS,
  REVIEWSEND_FAILURE,
} from './actionTypes.js';

const initialState = {
  success: false,
  error: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEWSEND_REQUEST:
      return {
        ...state,
      };
    case REVIEWSEND_SUCCESS:
      return {
        error: false,
        success: action.dataResult.status,
        errorMessage: action.dataResult.message,
      };
    case REVIEWSEND_FAILURE:
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
