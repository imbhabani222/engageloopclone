/* eslint-disable generator-star-spacing */
import { call } from "redux-saga/effects";

import actions from "../constants/empActions";
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

export function* uploadEmpData ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}org/api/v1/create-employee-csv`,
    successAction: actions.UPLOAD_EMP_THRU_CSV_SUCCESS,
    errorAction: actions.UPLOAD_EMP_THRU_CSV_ERROR,
    params: { data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST,
    {
      ...constants.HTTP_MULTIPART_FORM_HEADERS
    },
    undefined,
    false,
    undefined,
    true
  );
}
