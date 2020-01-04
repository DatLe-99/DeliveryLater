import {HttpClient} from '../../services/index';

import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAILURE} from './actionTypes.js';

import {ORDER} from '../../utils/api';

const orderRequest = () => {
  return {
    type: ORDER_REQUEST,
  };
};

const orderSuccess = dataResult => {
  return {
    type: ORDER_SUCCESS,
    dataResult,
  };
};

const orderError = dataResult => {
  return {
    type: ORDER_FAILURE,
    dataResult,
  };
};

const orderAction = params => {
  return dispatch => {
    dispatch(orderRequest);
    return HttpClient.requestPOST(ORDER, params)
      .then(dataResult => {
        dispatch(orderSuccess(dataResult));
      })
      .catch(error => {
        dispatch(orderError(error));
      });
  };
};

export default orderAction;
