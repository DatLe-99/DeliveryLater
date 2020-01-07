import {HttpClient} from '../../services/index';

import {UPDATEDISTANCE_REQUEST, UPDATEDISTANCE_SUCCESS, UPDATEDISTANCE_FAILURE} from './actionTypes.js';

import {UPDATEADDRESSORDER} from '../../utils/api';

const updatedistanceRequest = () => {
  return {
    type: UPDATEDISTANCE_REQUEST,
  };
};

const updatedistanceSuccess = dataResult => {
  return {
    type: UPDATEDISTANCE_SUCCESS,
    dataResult,
  };
};

const updatedistanceError = dataResult => {
  return {
    type: UPDATEDISTANCE_FAILURE,
    dataResult,
  };
};

const updateorderaddressAction = params => {
  return dispatch => {
    dispatch(updatedistanceRequest);
    return HttpClient.requestPOST(UPDATEADDRESSORDER, params)
      .then(dataResult => {
        dispatch(updatedistanceSuccess(dataResult));
      })
      .catch(error => {
        dispatch(updatedistanceError(error));
      });
  };
};

export default updateorderaddressAction;
