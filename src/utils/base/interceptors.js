/*
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
*/

const onRequest = (config) => {
  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {

  if (response.status === 401) {
    window.location.href = '/auth/login';
  }
  return response;
};

const onResponseError = async (error) => {
  if (error?.response?.data) {
    if (error.response.status === 401) {
      window.location.href = '/auth/login';
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance
) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};