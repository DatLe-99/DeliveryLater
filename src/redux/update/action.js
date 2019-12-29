import {HttpClient} from '../../services/index';

import {
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} from './actionTypes.js';

import {UPDATE} from '../../utils/api';

const updateRequest = () => {
  return {
    type: UPDATE_REQUEST,
  };
};

const updateSuccess = dataResult => {
  return {
    type: UPDATE_SUCCESS,
    dataResult,
  };
};

const updateError = dataResult => {
  return {
    type: UPDATE_FAILURE,
    dataResult,
  };
};

const updateAction = params => {
  return dispatch => {
    dispatch(updateRequest);
    return HttpClient.requestPOST(UPDATE, params)
      .then(dataResult => {
        dispatch(updateSuccess(dataResult));
      })
      .catch(error => {
        dispatch(updateError(error));
      });
  };
};

export default updateAction;
