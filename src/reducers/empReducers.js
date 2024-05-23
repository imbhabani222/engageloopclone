import { combineReducers } from "redux";

import actions from "../constants/empActions";
import {
  getFetchingState,
  getSuccessState,
  getErrorState,
  getResetState,
  createReducer
} from "../utils/reducers";

import { defaultState } from "./config";

const uploadEmpData = createReducer(
  defaultState,
  {
    [actions.UPLOAD_EMP_THRU_CSV]: getFetchingState,
    [actions.UPLOAD_EMP_THRU_CSV_SUCCESS]: getSuccessState,
    [actions.UPLOAD_EMP_THRU_CSV_ERROR]: getErrorState,
    [actions.CLEAR_UPLOAD_EMP_THRU_CSV]: getResetState
  }
);

export default combineReducers({
  uploadEmpData
});
