import {
    HttpClient
} from '../../services/index';

import {
    COMPLETE_REQUEST,
    COMPLETE_SUCCESS,
    COMPLETE_FAILURE
} from './actionTypes.js';

import {
    COMPLETE
} from '../../utils/api'

const completeRequest = () => {
    return {
        type: COMPLETE_REQUEST
    }
}

const completeSuccess = (dataResult) => {
    return {
        type: COMPLETE_SUCCESS,
        dataResult
    }
}

const completeError = (dataResult) => {
    return {
        type: COMPLETE_FAILURE,
        dataResult
    }
}

const completeAction = (params) => {
    return dispatch => {
        dispatch(completeRequest);
        return HttpClient.requestPOST(COMPLETE, params)
            .then(dataResult => {
                dispatch(completeSuccess(dataResult))
            })
            .catch((error) => {
                dispatch(completeError(error))
            });
    }
}

export default completeAction;