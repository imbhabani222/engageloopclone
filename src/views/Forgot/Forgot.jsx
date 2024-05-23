import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";

import {
  Form,
  Input,
  Button,
  Alert
} from "antd";

import { forgotPassword } from "../../actions/actions";
import constants from "../../constants/constants";
import message from "../../constants/messages";
import { defaultEmailRuleRestirct } from "../../config/Rules";

import "antd/dist/antd.css";
import "./forgot.scss";

const {
  ROUTES: {
    LOGIN
  },
  LOGIN_BACK_LABEL,
  FORGOT_PASSWORD_TITLE,
  FORGOT_PASSWORD_DESC,
  EMAIL_LABEL,
  EMAIL_PLACEHOLDER,
  FORGOT_PASSWORD_BUTTON
} = constants;

const Forgot = ({ history }) => {
  const dispatch = useDispatch();
  const { orgId } = useParams();
  const [msg, setmsg] = useState("");
  const forgotResponse = useSelector(state => state.appReducer.forgotPassword);
  useEffect(() => {
    if (forgotResponse.error) {
      setmsg(forgotResponse.error.message);
    } else if (forgotResponse.result) {
      setmsg(message.FORGOT_PASSWORD_LINK);
      history.push(LOGIN);
    }
  }, [forgotResponse]);

  const onFinish = useCallback(values => {
    const { email } = values;
    const payload = {
      email,
      orgId
    };
    dispatch(forgotPassword(payload));
  }, []);

  const handleLogin = useCallback(() => {
    history.push(LOGIN);
  }, []);

  return (
   <div className="forgot-right-area">
    <div className="title-text">
      <a onClick={handleLogin}>
          {LOGIN_BACK_LABEL}
      </a>
      <h2 className="text-blue">{FORGOT_PASSWORD_TITLE}</h2>
      <p>{FORGOT_PASSWORD_DESC}</p>
    </div>
    <div className="login-form-area">
      <div className={clsx("success-msg", {
        "msg-visibility": msg !== ""
      })}>
        <Alert message={msg} type="error" showIcon className="alert-error" />
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
          rules={[defaultEmailRuleRestirct]}
          className="emailInput"
        >
          <Input placeholder={EMAIL_PLACEHOLDER} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {FORGOT_PASSWORD_BUTTON}
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  );
};

Forgot.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(Forgot));
