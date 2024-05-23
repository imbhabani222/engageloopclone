/* eslint-disable generator-star-spacing */
import { call } from "redux-saga/effects";

import actions from "../constants/actions";
import constants from "../constants/constants";
import {
  getDataFromAPI
} from "../utils/sagas";
import {
  getToken
} from "../utils/workers";

import envConfig from "../config/env-urls";

const REACT_APP_ENV = process.env.REACT_APP_ENV;
const APIs = envConfig[REACT_APP_ENV].API;

const authToken = getToken();

export function* loginUser ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/login`,
    successAction: actions.LOGIN_USER_SUCCESS,
    errorAction: actions.LOGIN_USER_ERROR,
    params: { ...data }
  };

  yield call(
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* forgotPassword ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/forget-password`,
    successAction: actions.FORGOT_PASSWORD_SUCCESS,
    errorAction: actions.FORGOT_PASSWORD_ERROR,
    params: { ...data }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* logoutUser ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/logout`,
    successAction: actions.LOGOUT_USER_SUCCESS,
    errorAction: actions.LOGOUT_USER_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* refreshToken ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/refresh-token`,
    successAction: actions.REFRESH_TOKEN_SUCCESS,
    errorAction: actions.REFRESH_TOKEN_ERROR,
    params: { ...data }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}
