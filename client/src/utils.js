import axios from "axios";
import { store } from "./redux/store";
import * as actionTypes from "./redux/actionTypes";

export const host = "http://localhost:5000";
export const domain = `${host}/v0`;

export const axiosInstance = axios.create({
  baseURL: domain,
});

export const handleAuthError = (error) => {
  if (error && error.response && error.response.status === 401) {
    // rootReducer.p
    // history.push('/pages/login')
    // toast.error("Authorization error, Please login again!");
    store.dispatch({ type: actionTypes.IS_LOADING, payload: false });
  }
  if (error && error.response && error.response.status === 403) {
    // toast.error("Authorization error, Please login again!");
    store.dispatch({ type: actionTypes.IS_LOADING, payload: false });
    // history.push('/pages/login')
  }
};

axiosInstance.interceptors.request.use(function requestSuccess(axiosConfig) {
  // axiosConfig.headers["x-source"] = "admin";
  store.dispatch({ type: actionTypes.IS_LOADING, payload: true });
  return axiosConfig;
});

axiosInstance.interceptors.response.use(
  function responseSuccess(axiosResConfig) {
    store.dispatch({ type: actionTypes.IS_LOADING, payload: false });
    return axiosResConfig;
  },
  function responseError(error) {
    store.dispatch({ type: actionTypes.IS_LOADING, payload: false });
    handleAuthError(error);

    return Promise.reject(error);
  }
);
