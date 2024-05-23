import { takeLatest } from "redux-saga/effects";

import { createWatcher } from "../utils/sagas";
import actions from "../constants/actions";

import * as worker from "../workers/dashboardWorkers";

export const getActivityLog = createWatcher(
  actions.GET_ACTIVITY_LOG,
  worker.getActivityLog,
  takeLatest
);
