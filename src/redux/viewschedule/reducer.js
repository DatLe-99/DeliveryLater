import {
  VIEWSCHEDULE_REQUEST,
  VIEWSCHEDULE_SUCCESS,
  VIEWSCHEDULE_FAILURE,
} from './actionTypes.js';

const initialState = {
  dataRes: null,
  success: false,
  error: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VIEWSCHEDULE_REQUEST:
      return {
        ...state,
      };
    case VIEWSCHEDULE_SUCCESS:
      return {
        error: false,
        success: action.dataResult.status,
        dataRes: action.dataResult.order,
        errorMessage: action.dataResult.message,
      };
    case VIEWSCHEDULE_FAILURE:
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
