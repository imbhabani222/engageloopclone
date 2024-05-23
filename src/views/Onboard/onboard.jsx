import React from "react";

import {
  Row,
  Col
} from "antd";

import SubMenu from "./subMenu";
import OrgOnboard from "./orgOnboard/orgOnboard";
import EditOrgOnboard from "./orgOnboard/editOrgOnboard/editorgOnboard";
import OrgView from "./orgView/orgview";
import { useLocation, withRouter } from "react-router-dom";
import constants from "../../constants/constants";

import "antd/dist/antd.css";
import "./Onboard.scss";

const {
  ROUTES: {
    ONBOARD,
    VIEWONBOARD,
    EDITORG
  }
} = constants;

const Onboard = () => {
  const location = useLocation();
  return (
    <div>
      <div className="content-root">
        <SubMenu />
        <div className="site-layout-content">
          <Row>
            <Col span={24}>
              {location.pathname === ONBOARD ? <OrgOnboard /> : null }
              {location.pathname.includes(EDITORG) ? <EditOrgOnboard /> : null }
              {location.pathname === VIEWONBOARD ? <OrgView /> : null }
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default React.memo(withRouter(Onboard));
