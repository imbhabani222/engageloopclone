import actions from "../constants/actions";

export const loginUser = data => ({
  type: actions.LOGIN_USER,
  data
});

export const clearLoginUser = () => ({
  type: actions.CLEAR_LOGIN_USER
});

export const forgotPassword = data => ({
  type: actions.FORGOT_PASSWORD,
  data
});

export const clearForgotPassord = () => ({
  type: actions.CLEAR_FORGOT_PASSWORD
});

export const logoutUser = data => ({
  type: actions.LOGOUT_USER,
  data
});

export const clearLogoutUser = () => ({
  type: actions.CLEAR_LOGOUT_USER
});

export const refreshToken = data => ({
  type: actions.REFRESH_TOKEN,
  data
});

export const clearRefreshToken = () => ({
  type: actions.CLEAR_REFRESH_TOKEN
});

export const userProfile = data => ({
  type: actions.USER_PROFILE,
  data
});

export const clearuserProfile = () => ({
  type: actions.CLEAR_USER_PROFILE
});
