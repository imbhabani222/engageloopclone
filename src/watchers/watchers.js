import { takeLatest } from "redux-saga/effects";

import { createWatcher } from "../utils/sagas";
import actions from "../constants/actions";

import * as worker from "../workers/workers";

export const loginUser = createWatcher(
  actions.LOGIN_USER,
  worker.loginUser,
  takeLatest
);

export const forgotPassword = createWatcher(
  actions.FORGOT_PASSWORD,
  worker.forgotPassword,
  takeLatest
);

export const logoutUser = createWatcher(
  actions.LOGOUT_USER,
  worker.logoutUser,
  takeLatest
);

export const refreshToken = createWatcher(
  actions.REFRESH_TOKEN,
  worker.refreshToken,
  takeLatest
);
