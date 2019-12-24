/**
 * Declare 
 */
import axios from 'axios';

/**
 * Domain send request from server
 */
import { DOMAIN_URL } from '../../utils/api';

/**
 * Time out axios
 */
const TIME_OUT = 5000;

const NETWORK_ERROR = 'Network Error';
const NETWORK_TIMEOUT_STATUS = 'ECONNABORTED'; 

const NetworkCode = {
    TIME_OUT: 408,
    ERROR: -1
}

/**
 * Creating an instance
 */
createAxiosInstance = () => {
    return axios.create({
        baseURL: DOMAIN_URL,
        timeout: TIME_OUT,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
          
        }
    });
};

class HttpClient {

    constructor() {
        this.instance = createAxiosInstance();
    }

    /**
     * @param {*} url sent request one to one api
     * @param {*} method 4 method common: POST, PUT, GET, DELETE
     * @param {*} data send param JSON
     * @param {*} headers are custom headers to be sent
     * @param {*} params are the URL parameters to be sent with the request example : { ID: 12345 }
     */
    request(url, method, data, headers = null, params = null) {

        var urlParameters = '';

        if (params != null) {
            urlParameters += '/' + Object.entries(params).map(e => e.join('=')).join('&');
        }

        let self = this;
        let promise = new Promise((resolve, reject) => {

            let config = {
                url: url.concat(urlParameters),
                method
            };

            if (headers) {
                config.headers = headers
            }
            if (method == 'GET' || method == 'PUT' || method == 'DELETE') {
                config.params = data;
            } else {
                config.data = data;
            }
            self.instance.request(config).then(async (response) => {
                console.log(config)
                if (response) {
                    return resolve(response.data);
                }

            }).catch(async (error) => {
                if(error.response) {
                    if (error.response.status === 401) {
                        error.response.msg = 'Tài khoản của bạn đã được truy cập trên thiết bị khác. Vui lòng đăng nhập lại!';
                        const errorResponse = error.response;
                        reject(errorResponse);
                    } else if (error.response.status === 408) {
                        error.response.msg = 'Network Timeout (Kết nối không có phản hồi)';
                        const errorResponse = error.response;
                        reject(errorResponse);
                    } else if (error.message && error.message.includes('Network Error')) {
                        error.response.msg = 'Network Error (Không có kết nối mạng)';
                        const errorResponse = error.response;
                        reject(errorResponse);
                    } else {
                        reject(error);
                    }
                } else {
                    const errorResponse = {};
                    errorResponse.msg = 'Network Error (Không có kết nối mạng). Vui lòng kiểm tra lại đường truyền!';
                    errorResponse.code = 404;
                    reject(errorResponse);
                }
            });
        });
        return promise;
    }


    /**
     *  Request post
     */
    requestPOST = (url, data, headers = null) => {
        return this.request(url, 'POST', data, headers);
    }

    /**
     * Suggest you show used params not param for get
     */
    requestGET = (url, param, headers = null, params = null) => {
        return this.request(url, 'GET', param, headers, params);
    }

    /**
     * Request put date ( update data)
     */
    requestPUT = (url, param, headers = null) => {
        return this.request(url, 'PUT', param, headers);
    }

    /**
     * Delete data with url
     */
    requestDELETE = (url, param, headers = null, params = null) => {
        return this.request(url, 'DELETE', param, headers, params);
    }
}

module.exports = new HttpClient();