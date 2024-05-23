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

export function* getActivityLog ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/get-all-activities`,
    successAction: actions.GET_ACTIVITY_LOG_SUCCESS,
    errorAction: actions.GET_ACTIVITY_LOG_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}
