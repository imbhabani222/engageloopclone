import actions from "../constants/actions";

export const orgOnboarding = data => ({
  type: actions.ORG_ONBOARDING,
  data
});

export const clearOrgOnboarding = () => ({
  type: actions.CLEAR_ORG_ONBOARDING
});

export const getorgCode = () => ({
  type: actions.GET_ORG_CODE
});

export const clearOrgCode = () => ({
  type: actions.CLEAR_GET_ORD_CODE
});

export const getTenants = data => ({
  type: actions.GET_TENANTS,
  data
});

export const clearGetTenants = () => ({
  type: actions.CLEAR_GET_TENANTS
});

export const orgUserRole = data => ({
  type: actions.ORG_USER_ROLE,
  data
});

export const getTenantsDetails = data => ({
  type: actions.GET_TENANTS_DETAILS,
  data
});

export const clearTenantsDetails = () => ({
  type: actions.CLEAR_GET_TENANTS_DETAILS
});

export const changeTenantsStatus = (data, orgId) => ({
  type: actions.CHANGE_TENANTS_STAUS,
  data,
  orgId
});

export const clearchangeTenantsStatus = () => ({
  type: actions.CLEAR_CHANGE_TENANTS_STAUS
});

export const activateAccount = (data) => ({
  type: actions.ACTIVATE_ACCOUNT,
  data
});

export const clearActivateAccount = () => ({
  type: actions.CLEAR_ACTIVATE_ACCOUNT
});
export const getStatusCode = () => ({
  type: actions.GET_STATUS_CODE
});

export const cleargetStatusCode = () => ({
  type: actions.CLEAR_GET_STATUS_CODE
});

export const updateOrg = (data) => ({
  type: actions.UPDATE_ORG,
  data
});

export const clearupdateOrg = () => ({
  type: actions.CLEAR_UPDATE_ORG
});

export const removeLogo = (data) => ({
  type: actions.REMOVE_LOGO,
  data
});

export const clearremoveLogo = () => ({
  type: actions.CLEAR_REMOVE_LOGO
});

export const getEmployeeDetails = data => ({
  type: actions.GET_EMPLOYEE_DETAILS,
  data
});

export const clearEmployeeDetails = () => ({
  type: actions.CLEAR_GET_EMPLOYEE_DETAILS
});

export const onboardEmployee = data => ({
  type: actions.ONBOARD_EMPLOYEE,
  data
});

export const clearonboardEmployee = () => ({
  type: actions.CLEAR_ONBOARD_EMPLOYEE
});

export const reActivate = data => ({
  type: actions.REACTIVATE,
  data
});

export const clearreActivate = () => ({
  type: actions.CLEAR_REACTIVATE
});

export const empreActivate = data => ({
  type: actions.EMP_REACTIVATE,
  data
});

export const clearempreActivate = () => ({
  type: actions.CLEAR_EMP_REACTIVATE
});

export const initilizeOrg = data => ({
  type: actions.INITILIZEORG,
  data
});

export const clearinitilizeOrg = () => ({
  type: actions.CLEAR_INITILIZEORG
});
