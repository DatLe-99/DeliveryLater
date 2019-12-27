import {
    HttpClient
} from '../../services/index';

import {SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE} from './actionTypes.js';

import {
    SEARCH
} from '../../utils/api'

const searchRequest = () => {
    return {
        type: SEARCH_REQUEST
    }
}

const searchSuccess = (dataResult) => {
    return {
        type: SEARCH_SUCCESS,
        dataResult
    }
}

const searchError = (dataResult) => {
    return {
        type: SEARCH_FAILURE,
        dataResult
    }
}

const searchAction = (params) => {
    return dispatch => {
        dispatch(searchRequest);
        return HttpClient.requestPOST(SEARCH, params)
        .then(dataResult => {
            dispatch(searchSuccess(dataResult))
        })
        .catch((error) => {
            dispatch(searchError(error))
        });
    }
}

export default searchAction;