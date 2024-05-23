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

const getActivityLog = createReducer(
  defaultState,
  {
    [actions.GET_ACTIVITY_LOG]: getFetchingState,
    [actions.GET_ACTIVITY_LOG_SUCCESS]: getSuccessState,
    [actions.GET_ACTIVITY_LOG_ERROR]: getErrorState,
    [actions.CLEAR_ACTIVITY_LOG]: getResetState
  }
);

export default combineReducers({
  getActivityLog
});
