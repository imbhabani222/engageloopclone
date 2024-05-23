import { combineReducers } from "redux";

import actions from "../constants/actions";
import {
  getFetchingState,
  getSuccessState,
  getErrorState,
  getResetState,
  createReducer
} from "../utils/reducers";

import { defaultState } from "./config";

const orgOnboarding = createReducer(
  defaultState,
  {
    [actions.ORG_ONBOARDING]: getFetchingState,
    [actions.ORG_ONBOARDING_SUCCESS]: getSuccessState,
    [actions.ORG_ONBOARDING_ERROR]: getErrorState,
    [actions.CLEAR_ORG_ONBOARDING]: getResetState
  }
);

const getorgCode = createReducer(
  defaultState,
  {
    [actions.GET_ORG_CODE]: getFetchingState,
    [actions.GET_ORD_CODE_SUCCESS]: getSuccessState,
    [actions.GET_ORD_CODE_ERROR]: getErrorState,
    [actions.CLEAR_GET_ORD_CODE]: getResetState
  }
);

const getTenants = createReducer(
  defaultState,
  {
    [actions.GET_TENANTS]: getFetchingState,
    [actions.GET_TENANTS_SUCCESS]: getSuccessState,
    [actions.GET_TENANTS_ERROR]: getErrorState,
    [actions.CLEAR_GET_TENANTS]: getResetState
  }
);

const orgUserRole = createReducer(
  defaultState,
  {
    [actions.ORG_USER_ROLE]: getFetchingState,
    [actions.ORG_USER_ROLE_SUCCESS]: getSuccessState,
    [actions.ORG_USER_ROLE_ERROR]: getErrorState,
    [actions.CLEAR_ORG_USER_ROLE_TOKEN]: getResetState
  }
);

const getTenantsDetails = createReducer(
  defaultState,
  {
    [actions.GET_TENANTS_DETAILS]: getFetchingState,
    [actions.GET_TENANTS_DETAILS_SUCCESS]: getSuccessState,
    [actions.GET_TENANTS_DETAILS_ERROR]: getErrorState,
    [actions.CLEAR_GET_TENANTS_DETAILS]: getResetState
  }
);

const changeTenantsStatus = createReducer(
  defaultState,
  {
    [actions.CHANGE_TENANTS_STAUS]: getFetchingState,
    [actions.CHANGE_TENANTS_STAUS_SUCCESS]: getSuccessState,
    [actions.CHANGE_TENANTS_STAUS_ERROR]: getErrorState,
    [actions.CLEAR_CHANGE_TENANTS_STAUS]: getResetState
  }
);

const activateAccount = createReducer(
  defaultState,
  {
    [actions.ACTIVATE_ACCOUNT]: getFetchingState,
    [actions.ACTIVATE_ACCOUNT_SUCCESS]: getSuccessState,
    [actions.ACTIVATE_ACCOUNT_ERROR]: getErrorState,
    [actions.CLEAR_ACTIVATE_ACCOUNT]: getResetState
  }
);

const getStatusCode = createReducer(
  defaultState,
  {
    [actions.GET_STATUS_CODE]: getFetchingState,
    [actions.GET_STATUS_CODE_SUCCESS]: getSuccessState,
    [actions.GET_STATUS_CODE_ERROR]: getErrorState,
    [actions.CLEAR_GET_STATUS_CODE]: getResetState
  }
);

const updateOrg = createReducer(
  defaultState,
  {
    [actions.UPDATE_ORG]: getFetchingState,
    [actions.UPDATE_ORG_SUCCESS]: getSuccessState,
    [actions.UPDATE_ORG_ERROR]: getErrorState,
    [actions.CLEAR_UPDATE_ORG]: getResetState
  }
);

const removeLogo = createReducer(
  defaultState,
  {
    [actions.REMOVE_LOGO]: getFetchingState,
    [actions.REMOVE_LOGO_SUCCESS]: getSuccessState,
    [actions.REMOVE_LOGO_ERROR]: getErrorState,
    [actions.CLEAR_REMOVE_LOGO]: getResetState
  }
);

const getEmployeeDetails = createReducer(
  defaultState,
  {
    [actions.GET_EMPLOYEE_DETAILS]: getFetchingState,
    [actions.GET_EMPLOYEE_DETAILS_SUCCESS]: getSuccessState,
    [actions.GET_EMPLOYEE_DETAILS_ERROR]: getErrorState,
    [actions.CLEAR_GET_EMPLOYEE_DETAILS]: getResetState
  }
);

const onboardEmployee = createReducer(
  defaultState,
  {
    [actions.ONBOARD_EMPLOYEE]: getFetchingState,
    [actions.ONBOARD_EMPLOYEE_SUCCESS]: getSuccessState,
    [actions.ONBOARD_EMPLOYEE_ERROR]: getErrorState,
    [actions.CLEAR_ONBOARD_EMPLOYEE]: getResetState
  }
);

const userProfile = createReducer(
  defaultState,
  {
    [actions.USER_PROFILE]: getFetchingState,
    [actions.USER_PROFILE_SUCCESS]: getSuccessState,
    [actions.USER_PROFILE_ERROR]: getErrorState,
    [actions.CLEAR_USER_PROFILE]: getResetState
  }
);

const reActivate = createReducer(
  defaultState,
  {
    [actions.REACTIVATE]: getFetchingState,
    [actions.REACTIVATE_SUCCESS]: getSuccessState,
    [actions.REACTIVATE_ERROR]: getErrorState,
    [actions.CLEAR_REACTIVATE]: getResetState
  }
);

const empreActivate = createReducer(
  defaultState,
  {
    [actions.EMP_REACTIVATE]: getFetchingState,
    [actions.EMP_REACTIVATE_SUCCESS]: getSuccessState,
    [actions.EMP_REACTIVATE_ERROR]: getErrorState,
    [actions.CLEAR_EMP_REACTIVATE]: getResetState
  }
);

const initilizeOrg = createReducer(
  defaultState,
  {
    [actions.INITILIZEORG]: getFetchingState,
    [actions.INITILIZEORG_SUCCESS]: getSuccessState,
    [actions.INITILIZEORG_ERROR]: getErrorState,
    [actions.CLEAR_INITILIZEORG]: getResetState
  }
);

export default combineReducers({
  orgOnboarding,
  getorgCode,
  getTenants,
  orgUserRole,
  getTenantsDetails,
  changeTenantsStatus,
  activateAccount,
  getStatusCode,
  updateOrg,
  removeLogo,
  getEmployeeDetails,
  onboardEmployee,
  userProfile,
  reActivate,
  empreActivate,
  initilizeOrg
});
