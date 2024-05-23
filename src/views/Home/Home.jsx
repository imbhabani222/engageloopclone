import React from "react";

import {
  Row,
  Col
} from "antd";

import Welcome from "../../components/Welcome/Welcome";
import Dashboard from "./Dashboard/Dashboard";
import ActivityLog from "./ActivityLog/ActivityLog";
import OrgLogo from "./OrgLogo/OrgLogo";

import { getUserRole, getUserName } from "../../utils";

import constants from "../../constants/constants";
import "./styles.scss";

const {
  ROLES: {
    ADMIN
  }
} = constants;

const Home = () => {
  const userRole = getUserRole();
  const userName = getUserName();

  return (
    <Row>
      <Col xs={24} sm={14} md={14} lg={18} xl={18}>
        <Row
          gutter={{ xs: 0, sm: 0, md: 10, lg: 20, xl: 20 }}
          style={{ margin: 0 }}
        >
          <Col span={24}>
            <Welcome userName={userName} />
          </Col>
          <Col span={24}>
            <Dashboard />
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={10} md={10} lg={6} xl={6}>
        <Row gutter={[20, 20]} style={{ margin: 0, marginTop: 33 }}>
          {
            userRole !== ADMIN
              ? <>
                  <Col span={24}>
                    <OrgLogo />
                  </Col>
                  <Col span={24}>
                  <ActivityLog />
                </Col>
                </>
              : <Col span={24}>
                  <ActivityLog />
                </Col>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(Home);
