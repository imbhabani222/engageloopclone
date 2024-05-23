import React, { useCallback } from "react";
import { withRouter, useParams } from "react-router-dom";
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
import "./ChangePassword.scss";
import Auth from "@aws-amplify/auth";

const {
  ROUTES: {
    LOGIN,
    PASSWORDSUCCESS
  },
  PASSWORD: {
    CONFORMPASSWORD,
    NEWPASSWORD,
    OLDPASSWORD
  },
  LOGIN_BACK_LABEL,
  CHANGEPASSWORD_TITLE,
  CHANGEPASSWORD_DESC,
  NEW_PASSWORD_LABEL,
  CONFIRM_PASSWORD_LABEL,
  OLD_PASSWORD,
  CHANGEPASSWORD
} = constants;

const ChangePassword = ({ history }) => {
  const { username } = useParams();
  const handleLogin = useCallback(() => {
    history.push(LOGIN);
  }, []);

  const handleActivateAccounut = useCallback(values => {
    const { password, oldPassword } = values;
    Auth.signIn(username, oldPassword)
      .then(user => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          Auth.completeNewPassword(
            user, // the Cognito User Object
            password // the new password
          ).then(user => {
            // at this time the user is logged in if no MFA required
            history.push(PASSWORDSUCCESS);
          }).catch(e => {
            // other situations
          });
        } else {
        // other situations
        }
      }).catch(e => {
        // other situations
      });
  }, []);

  return (
    <div className="activate-account-right-area">
      <div className="title-text">
        <a onClick={handleLogin}>{LOGIN_BACK_LABEL}</a>
        <h2 className="text-blue">{CHANGEPASSWORD_TITLE}</h2>
        <p>{CHANGEPASSWORD_DESC}</p>
      </div>
      <div className="login-form-area">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleActivateAccounut}
        >
        <h4>{OLD_PASSWORD}</h4>
          <Form.Item
            name="oldPassword"
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
              {CHANGEPASSWORD}
            </Button>
            </Form.Item>
        </Form>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(ChangePassword));
