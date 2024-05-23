import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import moment from "moment";

const cookies = new Cookies();

export const checkForValidToken = () => {
  const token = cookies.get("elToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    const dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()) {
      return true;
    }
  }

  return false;
};

export const getRemainingTimeForToken = () => {
  const token = cookies.get("elToken");

  if (token) {
    const decodedToken = jwtDecode(token);

    return (decodedToken.exp * 1000 - Date.now()) / 1000;
  }

  return 0;
};

export const getUserRole = () => {
  return cookies.get("elUserRole");
};

export const getUserLogo = () => {
  return cookies.get("elUserLogo");
};

export const getUserOrgCode = () => {
  return cookies.get("elUserOrgCode");
};

export const getUserName = () => {
  return cookies.get("elUserName");
};

export const getloginMode = () => {
  return cookies.get("loginMode");
};

export const addCommaToNumber = num => {
  return num.toLocaleString();
};

export const checkNumbervalue = (event) => {
  if (!/^[0-9]*\.?[0-9]*$/.test(event.key) &&
  event.key !== "Backspace") {
    return true;
  }
};

export const checkSpecialCharacter = (event) => {
  if (!/^[A-Za-z0-9 ]+$/.test(event.key) &&
  event.key !== "Backspace") {
    return true;
  }
};

export const checkAlphabets = (event) => {
  if (!/^[a-zA-Z ]*$/.test(event.key) &&
  event.key !== "Backspace") {
    return true;
  }
};

export const dateConvert = (e) => {
  return moment(e).format("DD-MM-YYYY [at] h:mm A z");
};

export const isNull = (e) => {
  return e ? e + ", " : "";
};

export const isBlank = (e) => {
  return e || "";
};
