import axios from 'axios';
import { API_HOST } from './Path';

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    // eslint-disable-next-line no-param-reassign
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
},  (error, res)  => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401 && window.location.pathname !== '/login') {
    localStorage.removeItem('TOKEN');
    window.location = '/login';
  }
  return Promise.reject(error);
});

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const processRequest = (method, endPoint, requestData, headerConfig) => {
  if (method === 'get') {
    return api.get(endPoint, headerConfig);
  } if (method === 'post') {
    return api.post(endPoint, requestData, headerConfig);
  } if (method === 'put') {
    return api.put(endPoint, requestData, headerConfig);
  } if (method === 'patch') {
    return api.patch(endPoint, requestData, headerConfig);
  } if (method === 'delete') {
    return api.delete(endPoint, headerConfig);
  }
  throw new Error('Invalid method passed');
};

const getHeaders = () => {
  const headers = {
    ...defaultHeaders,
  };
  return headers;
};

export default {
  sendRequest(method, endPoint, requestData = null) {
    const headers = getHeaders();
    return processRequest(method, API_HOST + endPoint, requestData, headers)
      .then(response => response)
      .catch((error) => {
        throw error;
      });
  },
};
