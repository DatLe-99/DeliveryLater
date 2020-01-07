import {HttpClient} from '../../services/index';

import {
  VIEWSCHEDULE_REQUEST,
  VIEWSCHEDULE_SUCCESS,
  VIEWSCHEDULE_FAILURE,
} from './actionTypes.js';

import {VIEWSCHEDULE} from '../../utils/api';

const viewscheduleRequest = () => {
  return {
    type: VIEWSCHEDULE_REQUEST,
  };
};

const viewscheduleSuccess = dataResult => {
  return {
    type: VIEWSCHEDULE_SUCCESS,
    dataResult,
  };
};

const viewscheduleError = dataResult => {
  return {
    type: VIEWSCHEDULE_FAILURE,
    dataResult,
  };
};

const viewscheduleAction = params => {
  return dispatch => {
    dispatch(viewscheduleRequest);
    return HttpClient.requestPOST(VIEWSCHEDULE, params)
      .then(dataResult => {
        dispatch(viewscheduleSuccess(dataResult));
      })
      .catch(error => {
        dispatch(viewscheduleError(error));
      });
  };
};

export default viewscheduleAction;
