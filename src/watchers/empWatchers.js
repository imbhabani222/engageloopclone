import { takeLatest } from "redux-saga/effects";

import { createWatcher } from "../utils/sagas";
import actions from "../constants/empActions";

import * as worker from "../workers/empWorkers";

export const uploadEmpData = createWatcher(
  actions.UPLOAD_EMP_THRU_CSV,
  worker.uploadEmpData,
  takeLatest
);
