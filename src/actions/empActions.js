import actions from "../constants/empActions";

export const uploadEmpData = data => ({
  type: actions.UPLOAD_EMP_THRU_CSV,
  data
});

export const clearUploadEmpData = () => ({
  type: actions.CLEAR_UPLOAD_EMP_THRU_CSV
});
