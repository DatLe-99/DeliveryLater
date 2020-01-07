import {
  UPDATEDISTANCE_REQUEST,
  UPDATEDISTANCE_SUCCESS,
  UPDATEDISTANCE_FAILURE,
} from './actionTypes.js';

const initialState = {
  dataRes: null,
  success: false,
  error: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATEDISTANCE_REQUEST:
      return {
        ...state,
      };
    case UPDATEDISTANCE_SUCCESS:
      return {
        // error: false,
        success: action.dataResult.status,
        dataRes: action.dataResult.distance,
        // errorMessage: action.dataResult.message,
      };
    case UPDATEDISTANCE_FAILURE:
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
