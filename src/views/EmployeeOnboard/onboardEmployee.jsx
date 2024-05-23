import React from "react";

import {
  Row,
  Col
} from "antd";

import SubMenu from "./empsubMenu";
import EmpOnboard from "./onboard/orgOnboard";
import EmpView from "./view/employeeView";
import { useLocation, withRouter } from "react-router-dom";
import constants from "../../constants/constants";

import "antd/dist/antd.css";
import "./EmpOnboard.scss";

const {
  ROUTES: {
    ONBOARDEMPLOYEE,
    VIEWALLEMPLOYEE
  }
} = constants;

const OnboardEmployee = () => {
  const location = useLocation();
  return (
    <div>
      <div className="content-root">
        <SubMenu />
        <div className="site-layout-content">
          <Row>
            <Col span={24}>
              {location.pathname === ONBOARDEMPLOYEE ? <EmpOnboard /> : null }
              {location.pathname === VIEWALLEMPLOYEE ? <EmpView /> : null }
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default React.memo(withRouter(OnboardEmployee));
