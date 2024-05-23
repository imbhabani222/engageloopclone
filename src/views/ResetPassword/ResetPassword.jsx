import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Form,
  Input,
  Button
} from "antd";

import constants from "../../constants/constants";

import {
  defaultPasswordRule,
  defaultConfirmRequiredRule
} from "../../config/Rules";
import "antd/dist/antd.css";
import "./ResetPassword.scss";

const {
  ROUTES: {
    LOGIN
  },
  PASSWORD: {
    CONFORMPASSWORD,
    NEWPASSWORD,
    OLDPASSWORD
  },
  LOGIN_BACK_LABEL,
  NEW_PASSWORD_LABEL,
  OLD_PASSWORD_LABEL,
  CONFIRM_PASSWORD_LABEL,
  RESET_PASSWORD,
  RESET_PASSWORD_DESC,
  RESET_PASSWORD_BUTTON
} = constants;

const ResetPassword = ({ history }) => {
  const handleLogin = useCallback(() => {
    history.push(LOGIN);
  }, []);

  return (
    <div className="activate-account-right-area">
      <div className="title-text">
        <a onClick={handleLogin}>
          {LOGIN_BACK_LABEL}
        </a>
       <h2 className="text-blue">{RESET_PASSWORD}</h2>
       <p>{RESET_PASSWORD_DESC}</p>
      </div>
      <div className="login-form-area">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <h4>{OLD_PASSWORD_LABEL}</h4>
          <Form.Item
            name="oldpassword"
            rules={[defaultPasswordRule]}
            hasFeedback
            className="passwordInput"
          >
            <Input.Password
              placeholder={OLDPASSWORD}
              iconRender={visible => (visible ? "Hide" : "Show")}
            />
          </Form.Item>
          <h4>{NEW_PASSWORD_LABEL}</h4>
          <Form.Item
            name="password"
            rules={[defaultPasswordRule]}
            hasFeedback
            className="passwordInput"
          >
            <Input.Password
              placeholder={NEWPASSWORD}
              iconRender={visible => (visible ? "Hide" : "Show")}
            />
          </Form.Item>
          <h4>{CONFIRM_PASSWORD_LABEL}</h4>
          <Form.Item
            name="confirmpassword"
            dependencies={["password"]}
            hasFeedback
            rules={defaultConfirmRequiredRule}
            className="passwordInput"
          >
            <Input.Password
              placeholder={CONFORMPASSWORD}
              iconRender={visible => (visible ? "Hide" : "Show")}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              >
                {RESET_PASSWORD_BUTTON}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(ResetPassword));
