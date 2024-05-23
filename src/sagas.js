import { all, fork } from "redux-saga/effects";

import * as appWatcher from "./watchers/watchers";
import * as orgWatcher from "./watchers/orgWatchers";
import * as dashboardWatcher from "./watchers/dashboardWatchers";
import * as empWatcher from "./watchers/empWatchers";

// eslint-disable-next-line generator-star-spacing
function* appRootSaga () {
  yield all([
    fork(appWatcher.loginUser),
    fork(appWatcher.forgotPassword),
    fork(orgWatcher.orgOnboarding),
    fork(orgWatcher.getorgCode),
    fork(orgWatcher.getTenants),
    fork(appWatcher.logoutUser),
    fork(appWatcher.refreshToken),
    fork(orgWatcher.orgUserRole),
    fork(orgWatcher.getTenantsDetails),
    fork(orgWatcher.changeTenantsStatus),
    fork(orgWatcher.activateAccount),
    fork(orgWatcher.getStatusCode),
    fork(orgWatcher.updateOrg),
    fork(dashboardWatcher.getActivityLog),
    fork(orgWatcher.removeLogo),
    fork(orgWatcher.getEmployeeDetails),
    fork(orgWatcher.onboardEmployee),
    fork(orgWatcher.userProfile),
    fork(orgWatcher.reActivate),
    fork(empWatcher.uploadEmpData),
    fork(orgWatcher.empreActivate),
    fork(orgWatcher.initilizeOrg)
  ]);
}

export default appRootSaga;
