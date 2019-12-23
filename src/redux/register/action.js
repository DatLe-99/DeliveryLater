import {
    HttpClient
} from '../../services/index';

import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE
} from './actionTypes.js';

import {
    SIGN_UP
} from '../../utils/api'

const signUpRequest = () => {
    return {
        type: SIGN_UP_REQUEST
    }
}

const signUpSuccess = (dataResult) => {
    return {
        type: SIGN_UP_SUCCESS,
        dataResult
    }
}

const signUpError = (dataResult) => {
    return {
        type: SIGN_UP_FAILURE,
        dataResult
    }
}

const signUpAction = (params) => {
    return dispatch => {
        dispatch(signUpRequest);
        return HttpClient.requestPOST(SIGN_UP, params)
        .then(dataResult => {
            dispatch(signUpSuccess(dataResult))
        })
        .catch((error) => {
            dispatch(signUpError(error))
        });
    }
}

export default signUPAction;