import {HttpClient} from '../../services/index';

import {
  ADDRESS_REQUEST,
  ADDRESS_SUCCESS,
  ADDRESS_FAILURE,
} from './actionTypes.js';

import {ADDRESS} from '../../utils/api';

const addressRequest = () => {
  return {
    type: ADDRESS_REQUEST,
  };
};

const addressSuccess = dataResult => {
  return {
    type: ADDRESS_SUCCESS,
    dataResult,
  };
};

const addressError = dataResult => {
  return {
    type: ADDRESS_FAILURE,
    dataResult,
  };
};

const addressAction = params => {
  return dispatch => {
    dispatch(addressRequest);
    return HttpClient.requestPOST(ADDRESS, params)
      .then(dataResult => {
        dispatch(addressSuccess(dataResult));
      })
      .catch(error => {
        dispatch(addressError(error));
      });
  };
};

export default addressAction;
