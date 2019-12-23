import {
    HttpClient
} from '../../services/index';

import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE
} from './actionTypes.js';

import {
    SIGN_IN
} from '../../utils/api'

const signInRequest = () => {
    return {
        type: SIGN_IN_REQUEST
    }
}

const signInSuccess = (dataResult) => {
    return {
        type: SIGN_IN_SUCCESS,
        dataResult
    }
}

const signInError = (dataResult) => {
    return {
        type: SIGN_IN_FAILURE,
        dataResult
    }
}

const signInAction = (params) => {
    return dispatch => {
        dispatch(signInRequest);
        return HttpClient.requestPOST(SIGN_IN, params)
        .then(dataResult => {
            dispatch(signInSuccess(dataResult))
        })
        .catch((error) => {
            dispatch(signInError(error))
        });
    }
}

export default signInAction;