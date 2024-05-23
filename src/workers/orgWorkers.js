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

export function* orgOnboarding ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}admin/api/v1/onboard-org`,
    successAction: actions.ORG_ONBOARDING_SUCCESS,
    errorAction: actions.ORG_ONBOARDING_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* getorgCode ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}admin/api/v1/get-org-code`,
    successAction: actions.GET_ORD_CODE_SUCCESS,
    errorAction: actions.GET_ORD_CODE_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}

export function* getTenants ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}admin/api/v1/get-tenants?${data || ""}`,
    successAction: actions.GET_TENANTS_SUCCESS,
    errorAction: actions.GET_TENANTS_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}

export function* orgUserRole ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/get-all-role`,
    successAction: actions.ORG_USER_ROLE_SUCCESS,
    errorAction: actions.ORG_USER_ROLE_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* getTenantsDetails ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}admin/api/v1/get-tenants/${data}`,
    successAction: actions.GET_TENANTS_DETAILS_SUCCESS,
    errorAction: actions.GET_TENANTS_DETAILS_ERROR,
    params: { authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}

export function* changeTenantsStatus ({ data, orgId }) {
  const reqParams = {
    url: `${APIs.baseURL}admin/api/v1/activation-tenant-status/${orgId}`,
    successAction: actions.CHANGE_TENANTS_STAUS_SUCCESS,
    errorAction: actions.CHANGE_TENANTS_STAUS_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.PUT
  );
}

export function* activateAccount ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/activation-account`,
    successAction: actions.ACTIVATE_ACCOUNT_SUCCESS,
    errorAction: actions.ACTIVATE_ACCOUNT_ERROR,
    params: { ...data }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.PUT
  );
}

export function* getStatusCode ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}admin/api/v1/get-status-code`,
    successAction: actions.GET_STATUS_CODE_SUCCESS,
    errorAction: actions.GET_STATUS_CODE_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}

export function* updateOrg ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}admin/api/v1/update-onboard-org/${data.orgCode}`,
    successAction: actions.UPDATE_ORG_SUCCESS,
    errorAction: actions.UPDATE_ORG_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.PUT
  );
}

export function* removeLogo ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}org/api/v1/remove-logo`,
    successAction: actions.REMOVE_LOGO_SUCCESS,
    errorAction: actions.REMOVE_LOGO_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* getEmployeeDetails ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}org/api/v1/get-employees?${data}`,
    successAction: actions.GET_EMPLOYEE_DETAILS_SUCCESS,
    errorAction: actions.GET_EMPLOYEE_DETAILS_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}

export function* onboardEmployee ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}org/api/v1/onboard-employee`,
    successAction: actions.ONBOARD_EMPLOYEE_SUCCESS,
    errorAction: actions.ONBOARD_EMPLOYEE_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* userProfile ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}org/api/v1/get-profile`,
    successAction: actions.USER_PROFILE_SUCCESS,
    errorAction: actions.USER_PROFILE_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}

export function* reActivate ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/resend-email`,
    successAction: actions.REACTIVATE_SUCCESS,
    errorAction: actions.REACTIVATE_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* empreActivate ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}auth/api/v1/resend-email-employee`,
    successAction: actions.EMP_REACTIVATE_SUCCESS,
    errorAction: actions.EMP_REACTIVATE_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.POST
  );
}

export function* initilizeOrg ({ data }) {
  const reqParams = {
    url: `${APIs.baseURL}org/api/v1/initilize-org`,
    successAction: actions.INITILIZEORG_SUCCESS,
    errorAction: actions.INITILIZEORG_ERROR,
    params: { ...data, authToken }
  };

  yield call(
    getDataFromAPI,
    reqParams,
    constants.HTTP_METHODS.GET
  );
}
