import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import constants from "../../constants/constants";
import messages from "../../constants/messages";

import successIcon from "../../assets/img/success-icon.png";
import "antd/dist/antd.css";
import "./passwordChange.scss";

const {
  ROUTES: {
    LOGIN
  },
  LOGIN_BACK_LABEL
} = constants;

const {
  PASSWORD_CHANGED,
  PASSWORD_SUCCESS
} = messages;

const PasswordChange = ({ history }) => {
  const handleLogin = useCallback(() => {
    history.push(LOGIN);
  }, []);

  return (
    <div className="activate-account-right-area">
      <div className="login-form-area">
        <img src={successIcon} />
        <h2>{PASSWORD_CHANGED}</h2>
        <p>{PASSWORD_SUCCESS}</p>
        <a onClick={handleLogin}>{LOGIN_BACK_LABEL}</a>
      </div>
    </div>
  );
};

PasswordChange.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(PasswordChange));
