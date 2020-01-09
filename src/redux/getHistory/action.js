import {HttpClient} from '../../services/index';

import {
  GETHISTORY_REQUEST,
  GETHISTORY_SUCCESS,
  GETHISTORY_FAILURE,
} from './actionTypes.js';

import {GETHISTORY} from '../../utils/api';

const getHistoryRequest = () => {
  return {
    type: GETHISTORY_REQUEST,
  };
};

const getHistorySuccess = dataResult => {
  return {
    type: GETHISTORY_SUCCESS,
    dataResult,
  };
};

const getHistoryError = dataResult => {
  return {
    type: GETHISTORY_FAILURE,
    dataResult,
  };
};

const getHistoryAction = params => {
  return dispatch => {
    dispatch(getHistoryRequest);
    return HttpClient.requestPOST(GETHISTORY, params)
      .then(dataResult => {
        dispatch(getHistorySuccess(dataResult));
      })
      .catch(error => {
        dispatch(getHistoryError(error));
      });
  };
};

export default getHistoryAction;
