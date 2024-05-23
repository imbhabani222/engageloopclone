import actions from "../constants/actions";

export const getActivityLog = data => ({
  type: actions.GET_ACTIVITY_LOG,
  data
});

export const clearActivityLog = () => ({
  type: actions.CLEAR_ACTIVITY_LOG
});
