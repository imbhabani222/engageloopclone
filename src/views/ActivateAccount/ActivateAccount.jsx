import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import constants from "../../constants/constants";

import {
  activateAccount,
  clearActivateAccount
} from "../../actions/orgActions";
import successIcon from "../../assets/img/success-icon.png";
import messages from "../../constants/messages";
import "antd/dist/antd.css";
import "./ActivateAccount.scss";

const {
  ROUTES: {
    LOGIN
  },
  LOGIN_BACK_LABEL,
  ACTIVATEACCOUNT_TITLE
} = constants;

const {
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_ERROR
} = messages;

const ActivateAccount = ({ history }) => {
  const [Msg, setMsg] = useState("");
  const { authToken } = useParams();
  const dispatch = useDispatch();
  const activateAccountRes = useSelector(
    state => state.orgReducer.activateAccount,
    shallowEqual
  );

  const handleLogin = useCallback(() => {
    history.push(LOGIN);
  }, []);

  useEffect(() => {
    if (activateAccountRes.result === null && !activateAccountRes.fetching) {
      const payload = {
        authToken
      };
      dispatch(activateAccount(payload));
    }
  }, [activateAccount]);

  useEffect(() => {
    if (activateAccountRes.result) {
      dispatch(clearActivateAccount());
      setMsg(ACTIVATE_ACCOUNT_SUCCESS);
    } else if (activateAccountRes.error) {
      setMsg(ACTIVATE_ACCOUNT_ERROR);
    }
  }, [activateAccountRes]);

  return (
    <div className="activate-account-right-area">
      <div className="login-form-area">
        <img src={successIcon} />
        <h2>{ACTIVATEACCOUNT_TITLE}</h2>
        <p>{Msg}</p>
        <a onClick={handleLogin}>{LOGIN_BACK_LABEL}</a>
      </div>
    </div>
  );
};

ActivateAccount.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(ActivateAccount));
