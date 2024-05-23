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

const loginUser = createReducer(
  defaultState,
  {
    [actions.LOGIN_USER_ERROR]: getFetchingState,
    [actions.LOGIN_USER_SUCCESS]: getSuccessState,
    [actions.LOGIN_USER_ERROR]: getErrorState,
    [actions.CLEAR_LOGIN_USER]: getResetState
  }
);

const forgotPassword = createReducer(
  defaultState,
  {
    [actions.FORGOT_PASSWORD]: getFetchingState,
    [actions.FORGOT_PASSWORD_SUCCESS]: getSuccessState,
    [actions.FORGOT_PASSWORD_ERROR]: getErrorState,
    [actions.CLEAR_FORGOT_PASSWORD]: getResetState
  }
);

const logoutUser = createReducer(
  defaultState,
  {
    [actions.LOGOUT_USER]: getFetchingState,
    [actions.LOGOUT_USER_SUCCESS]: getSuccessState,
    [actions.LOGOUT_USER_ERROR]: getErrorState,
    [actions.CLEAR_LOGOUT_USER]: getResetState
  }
);

const refreshToken = createReducer(
  defaultState,
  {
    [actions.REFRESH_TOKEN]: getFetchingState,
    [actions.REFRESH_TOKEN_SUCCESS]: getSuccessState,
    [actions.REFRESH_TOKEN_ERROR]: getErrorState,
    [actions.CLEAR_REFRESH_TOKEN]: getResetState
  }
);

export default combineReducers({
  loginUser,
  forgotPassword,
  logoutUser,
  refreshToken
});
