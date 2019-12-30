import {
    HttpClient
} from '../../services/index';

import {NEWEST_REQUEST, NEWEST_SUCCESS, NEWEST_FAILURE} from './actionTypes.js';

import {
    NEWEST,
} from '../../utils/api'


const newestRequest = () => {
    return {
        type: NEWEST_REQUEST
    }
}

const newestSuccess = (dataResult) => {
    return {
        type: NEWEST_SUCCESS,
        dataResult
    }
}

const newestError = (dataResult) => {
    return {
        type: NEWEST_FAILURE,
        dataResult
    }
}

const newestAction = params => {
  return dispatch => {
    dispatch(newestRequest);
    return HttpClient.requestPOST(NEWEST, params)
      .then(dataResult => {
        dispatch(newestSuccess(dataResult));
      })
      .catch(error => {
        dispatch(newestError(error));
      });
  };
};

export default newestAction;