import axios from 'axios';
import { appController } from '../_helpers';

let axiosInstance = axios.create({
  baseURL: 'http://stoqo-take-home.xdzdxquptm.ap-southeast-1.elasticbeanstalk.com/',
  timeout: 61000
});

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 200) {
    axiosConfig = {};
    source = null;
  }
  return response;
}, (error) => {
  axiosConfig = error.config;
  return Promise.reject(error);
});

let source;
let axiosConfig = {};

let promise;

const execRequest = (url, data, isGet, isAuth, isParallelRequestAllowed) => {
  if (!isParallelRequestAllowed)
    apiService.cancel();
  let headers = {};
  let params = {};
  if (isAuth) {
    headers = {
      "Authorization": appController.userData.token,
      'Content-Type': 'application/json'
    };
  }
  let method = "POST";
  if (isGet) {
    method = "GET";
    params = {
      ...data
    };
    data = {};
  }
  source = axios.CancelToken.source();
  let AxiosConfig = {
    method,
    url,
    params,
    data,
    headers,
    cancelToken: source.token,
  }
  if (isParallelRequestAllowed)
    AxiosConfig.timeout = 360000;
  promise = axiosInstance(AxiosConfig);
  return promise;
}

const retryRequest = () => {
  return axiosInstance.request(axiosConfig);
}

const cancelRequest = () => {
  if (!source)
    return;
  source.cancel(-100);
  source = null;
}

export const apiService = {
  exec: execRequest,
  cancel: cancelRequest,
  retry: retryRequest
};
