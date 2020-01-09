import {HttpClient} from '../../services/index';

import {
  GETREVIEW_REQUEST,
  GETREVIEW_SUCCESS,
  GETREVIEW_FAILURE,
} from './actionTypes.js';

import {GETREVIEW} from '../../utils/api';

const getReviewRequest = () => {
  return {
    type: GETREVIEW_REQUEST,
  };
};

const getReviewSuccess = dataResult => {
  return {
    type: GETREVIEW_SUCCESS,
    dataResult,
  };
};

const getReviewError = dataResult => {
  return {
    type: GETREVIEW_FAILURE,
    dataResult,
  };
};

const getReviewAction = params => {
  return dispatch => {
    dispatch(getReviewRequest);
    return HttpClient.requestPOST(GETREVIEW, params)
      .then(dataResult => {
        dispatch(getReviewSuccess(dataResult));
      })
      .catch(error => {
        dispatch(getReviewError(error));
      });
  };
};

export default getReviewAction;
