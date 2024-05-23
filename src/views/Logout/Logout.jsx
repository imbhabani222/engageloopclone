import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Cookies from "universal-cookie";

import { Modal, Typography } from "antd";
import constants from "../../constants/constants";
import messages from "../../constants/messages";
import { logoutUser } from "../../actions/actions";

import { loginSampleData } from "../../sampleJSON/login";
import { withRouter } from "react-router";
import Auth from "@aws-amplify/auth";

const {
  LOGOUT_LABEL,
  ROUTES: {
    LOGIN
  }
} = constants;

const {
  ARE_YOU_SURE
} = messages;

const cookies = new Cookies();
const { Text } = Typography;

const Logout = ({ isVisible, handleCancel, history }) => {
  const dispatch = useDispatch();
  const logoutResponse = useSelector(
    state => state.appReducer.logoutUser,
    shallowEqual
  );

  useEffect(() => {
    if (logoutResponse.error) {
      handleCancel();
    } else if (logoutResponse.result) {
      cookies.remove("elToken");
      cookies.remove("elUserRole");
      history.push(LOGIN);
      handleCancel();
    }
  }, [logoutResponse]);

  const handleOk = useCallback(() => {
    Auth.logout();
    dispatch(logoutUser({
      orgId: loginSampleData.orgId
    }));
  }, []);

  return (
    <Modal
      title={LOGOUT_LABEL}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Text>{ ARE_YOU_SURE }</Text>
    </Modal>
  );
};

Logout.propTypes = {
  isVisible: PropTypes.bool,
  handleCancel: PropTypes.func,
  history: PropTypes.object
};

export default React.memo(withRouter(Logout));
