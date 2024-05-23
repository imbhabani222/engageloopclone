import { takeLatest } from "redux-saga/effects";

import { createWatcher } from "../utils/sagas";
import actions from "../constants/actions";

import * as worker from "../workers/orgWorkers";

export const orgOnboarding = createWatcher(
  actions.ORG_ONBOARDING,
  worker.orgOnboarding,
  takeLatest
);

export const getorgCode = createWatcher(
  actions.GET_ORG_CODE,
  worker.getorgCode,
  takeLatest
);

export const getTenants = createWatcher(
  actions.GET_TENANTS,
  worker.getTenants,
  takeLatest
);

export const orgUserRole = createWatcher(
  actions.ORG_USER_ROLE,
  worker.orgUserRole,
  takeLatest
);

export const getTenantsDetails = createWatcher(
  actions.GET_TENANTS_DETAILS,
  worker.getTenantsDetails,
  takeLatest
);

export const changeTenantsStatus = createWatcher(
  actions.CHANGE_TENANTS_STAUS,
  worker.changeTenantsStatus,
  takeLatest
);

export const activateAccount = createWatcher(
  actions.ACTIVATE_ACCOUNT,
  worker.activateAccount,
  takeLatest
);

export const getStatusCode = createWatcher(
  actions.GET_STATUS_CODE,
  worker.getStatusCode,
  takeLatest
);

export const updateOrg = createWatcher(
  actions.UPDATE_ORG,
  worker.updateOrg,
  takeLatest
);

export const removeLogo = createWatcher(
  actions.REMOVE_LOGO,
  worker.removeLogo,
  takeLatest
);

export const getEmployeeDetails = createWatcher(
  actions.GET_EMPLOYEE_DETAILS,
  worker.getEmployeeDetails,
  takeLatest
);

export const onboardEmployee = createWatcher(
  actions.ONBOARD_EMPLOYEE,
  worker.onboardEmployee,
  takeLatest
);

export const userProfile = createWatcher(
  actions.USER_PROFILE,
  worker.userProfile,
  takeLatest
);

export const reActivate = createWatcher(
  actions.REACTIVATE,
  worker.reActivate,
  takeLatest
);

export const empreActivate = createWatcher(
  actions.EMP_REACTIVATE,
  worker.empreActivate,
  takeLatest
);

export const initilizeOrg = createWatcher(
  actions.INITILIZEORG,
  worker.initilizeOrg,
  takeLatest
);
