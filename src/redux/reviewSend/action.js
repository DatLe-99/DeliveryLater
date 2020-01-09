import {HttpClient} from '../../services/index';

import {
  REVIEWSEND_REQUEST,
  REVIEWSEND_SUCCESS,
  REVIEWSEND_FAILURE,
} from './actionTypes.js';

import {REVIEWSEND} from '../../utils/api';

const reviewSendRequest = () => {
  return {
    type: REVIEWSEND_REQUEST,
  };
};

const reviewSendSuccess = dataResult => {
  return {
    type: REVIEWSEND_SUCCESS,
    dataResult,
  };
};

const reviewSendError = dataResult => {
  return {
    type: REVIEWSEND_FAILURE,
    dataResult,
  };
};

const reviewSendAction = params => {
  return dispatch => {
    dispatch(reviewSendRequest);
    return HttpClient.requestPOST(REVIEWSEND, params)
      .then(dataResult => {
        dispatch(reviewSendSuccess(dataResult));
      })
      .catch(error => {
        dispatch(reviewSendError(error));
      });
  };
};

export default reviewSendAction;
