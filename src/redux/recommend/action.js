import {
    HttpClient
} from '../../services/index';

import {RECOMMEND_REQUEST, RECOMMEND_SUCCESS, RECOMMEND_FAILURE} from './actionTypes.js';

import {
    RECOMMEND
} from '../../utils/api'


const recommendRequest = () => {
    return {
        type: RECOMMEND_REQUEST
    }
}

const recommendSuccess = (dataResult) => {
    return {
        type: RECOMMEND_SUCCESS,
        dataResult
    }
}

const recommendError = (dataResult) => {
    return {
        type: RECOMMEND_FAILURE,
        dataResult
    }
}

const recommendAction = (params) => {
    return dispatch => {
        dispatch(recommendRequest);
        return HttpClient.requestPOST(RECOMMEND, params)
        .then(dataResult => {
            dispatch(recommendSuccess(dataResult))
        })
        .catch((error) => {
            dispatch(recommendError(error))
        });
    }
}

export default recommendAction;