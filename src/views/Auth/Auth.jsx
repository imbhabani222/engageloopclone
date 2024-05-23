import React, { useState } from "react";
import {
  Row,
  Col,
  Spin
} from "antd";

import Login from "../Login/Login";
import Forgot from "../Forgot/Forgot";
import ActivateAccount from "../ActivateAccount/ActivateAccount";
import ResetPassword from "../ResetPassword/ResetPassword";
import ChangePassword from "../ChangePassword/ChangePassword";
import OrgError from "../OrgError/OrgError";
import PwdSuccess from "../passwordChange/passwordChange";
import { useLocation } from "react-router-dom";
import constants from "../../constants/constants";

import engageLogo from "../../assets/img/engageloop.png";

import "./Auth.scss";

const {
  ROUTES: {
    FORGOT_PASSWORD,
    ACTIVATEACCOUNT,
    LOGIN,
    RESETPASSWORD,
    CHANGEPASSWORD,
    ORGERROR,
    PASSWORDSUCCESS
  },
  LEFT_AREA_TEXT,
  COPYRIGHT,
  PRIVACY_TEXT
} = constants;

const Auth = () => {
  const location = useLocation();
  const [isLoading, setisLoading] = useState(false);
  const handleLoading = (e) => {
    setisLoading(e);
  };
  return (
    <div className="login-bg">
          <Spin spinning={isLoading} className="loader" size="large">
      <Row>
        <Col xs={0} sm={0} md={12} lg={12} xl={12} className="left-area">
          <Row className="logo-row">
            <Col span={24}>
              <img src={engageLogo} className="logo"/>
            </Col>
          </Row>
          <div className="left-area-text">
            <div>
              <p>{LEFT_AREA_TEXT}</p> </div>
            </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="right-area">
            <Row className="right-area-row">
            <Col xs={20} sm={20} md={0} lg={0} xl={0} offset={2}>
              <img src={engageLogo} className="logo"/>
            </Col>
              <Col xs={20} sm={20} md={16} lg={16} xl={16} offset={2}>
                {
                  location.pathname.includes(FORGOT_PASSWORD)
                    ? <Forgot />
                    : null
                }
                {location.pathname === LOGIN
                  ? <Login isLoading={handleLoading} />
                  : null }
                {
                  location.pathname.includes(ACTIVATEACCOUNT)
                    ? <ActivateAccount isLoading={handleLoading} />
                    : null
                }
                {
                  location.pathname === RESETPASSWORD
                    ? <ResetPassword />
                    : null
                }
                {
                  location.pathname.includes(CHANGEPASSWORD)
                    ? <ChangePassword />
                    : null
                }
                  {
                  location.pathname.includes(PASSWORDSUCCESS)
                    ? <PwdSuccess />
                    : null
                }
                {
                  location.pathname === ORGERROR
                    ? <OrgError />
                    : null
                }
                <div className="brand-text">
                  <p>{COPYRIGHT}</p>
                  <p className="link">{PRIVACY_TEXT}</p>
                </div>
              </Col>
            </Row>
         </Col>
      </Row>
      </Spin>
    </div>
  );
};

export default React.memo(Auth);
