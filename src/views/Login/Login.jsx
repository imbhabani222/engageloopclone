import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Icon from "@ant-design/icons";
import PropTypes from "prop-types";
import clsx from "clsx";
import Cookies from "universal-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  Alert
} from "antd";

import constants from "../../constants/constants";
import { defaultEmailRule, defaultPasswordRule } from "../../config/Rules";
import secureIcon from "../../assets/img/secure-icons.png";
import envConfig from "../../config/env-urls";
import { ReactComponent as GoogleIcon } from "../../assets/img/google-icon.svg";

import "antd/dist/antd.css";
import "./login.scss";
import messages from "../../constants/messages";
import { Auth } from "aws-amplify";

const REACT_APP_ENV = process.env.REACT_APP_ENV;
const APIs = envConfig[REACT_APP_ENV].API;
const {
  ROUTES: {
    HOME
  },
  REMEMBER_ME_LABEL,
  LOG_IN_LABEL,
  LOGIN_TITLE,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  PASSWORD_LABEL,
  PASSWORD_PLACEHOLDER,
  SECURED_TEXT,
  LOGIN_ERROR: {
    ORG_FAILED,
    CONTACT_ADMIN
  }
} = constants;

const {
  USER_ERROR

} = messages;

const cookies = new Cookies();

const Login = ({ history, isLoading }) => {
  const [msg, setmsg] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onFinish = (values) => {
    isLoading(true);
    const { email, password, remember } = values;
    setRememberMe(remember);
    axios
      .get(`${APIs.baseURL}org/api/v1/initilize-org`)
      .then((data) => {
        if (data.data.status === 200) {
          const { tenant } = data.data;
          const credentials = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password
          });
          const userPool = new AmazonCognitoIdentity.CognitoUserPool({
            ClientId: tenant.clientId,
            UserPoolId: tenant.poolId
          });
          const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: email,
            Pool: userPool
          });
          cognitoUser.authenticateUser(credentials, {
            onSuccess: function (result) {
              const accessToken = result.getAccessToken().getJwtToken();
              isLoading(true);
              axios
                .post(`${APIs.baseURL}auth/api/v1/validate-login`, {
                  token: accessToken
                })
                .then((_data) => {
                  isLoading(false);
                  const { data } = _data;
                  const { roleName, dbInstance, name, firstName } =
                    data.data.user;
                  const { logo } = data.data;
                  const decodedToken = jwtDecode(accessToken);
                  let { exp } = decodedToken;
                  const now = Date.now();
                  exp -= (new Date().getTimezoneOffset() * 60);
                  exp *= 1000;
                  cookies.set("elToken", accessToken, {
                    path: "/",
                    expires: new Date(exp)
                  });
                  cookies.set("elUserRole", roleName, {
                    path: "/",
                    expires: new Date(exp)
                  });
                  cookies.set("elUserLogo", logo, {
                    path: "/",
                    expires: new Date(exp)
                  });
                  cookies.set("elUserName", name || firstName, {
                    path: "/",
                    expires: new Date(exp)
                  });
                  cookies.set("elUserOrgCode", dbInstance, {
                    path: "/",
                    expires: new Date(exp)
                  });
                  cookies.set("elEmail", email, {
                    path: "/",
                    maxAge: rememberMe ? 604800 : (exp - now)
                  });
                  isLoading(false);
                  location.reload();
                  history.push(HOME);
                })
                .catch(() => {
                  isLoading(false);
                  setmsg(USER_ERROR);
                });
            },
            onFailure: function (_err) {
              isLoading(false);
              setmsg(CONTACT_ADMIN);
            },
            newPasswordRequired: function () {
              isLoading(false);
              location.replace(`changePassword/${email}`);
            }
          });
        } else {
          isLoading(false);
          setmsg(ORG_FAILED);
        }
      })
      .catch((_err) => {
        isLoading(false);
        setmsg(ORG_FAILED);
      });
  };

  return (
    <>
    <div className="login-right-area">
      <div className="title-text">
        <h2 className="text-blue">{LOGIN_TITLE}</h2>
      </div>
      <div className="login-form-area">
        <Divider className="divider"/>
          <div className={clsx("success-msg", {
            "msg-visibility": msg !== ""
          })}>
              <Alert
                message={msg}
                type="error"
                showIcon
                className="alert-error"
              />
          </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h4>{EMAIL_LABEL}</h4>
          <Form.Item
            name="email"
            rules={[defaultEmailRule]}
            className="emailInput"
          >
            <Input placeholder={EMAIL_PLACEHOLDER} />
          </Form.Item>
          <h4>{PASSWORD_LABEL}</h4>
          <Form.Item
            name="password"
            rules={[defaultPasswordRule]}
            className="passwordInput"
          >
            <Input.Password
              iconRender={visible => (visible ? "Hide" : "Show")}
              placeholder={PASSWORD_PLACEHOLDER}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" noStyle>
              <Checkbox>
                <span className="rememberLabel">
                  { REMEMBER_ME_LABEL }
                </span>
              </Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              { LOG_IN_LABEL }
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="text"
              className="googleBtn"
              icon={<Icon component={GoogleIcon}
              className="iconSvg"/>}
              onClick={() => Auth.federatedSignIn({ provider: "google" })}
            >
             Continue with Google
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    <div className="secureDesc">
      <p>
        <img
          src={secureIcon}
          className="secureIcon"
        />
        {SECURED_TEXT}
      </p>
    </div>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.object,
  isLoading: PropTypes.func
};

export default React.memo(withRouter(Login));
