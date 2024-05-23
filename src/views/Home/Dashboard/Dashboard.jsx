import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  Row,
  Col,
  Typography
} from "antd";
import Icon from "@ant-design/icons";

import { RoleBasedDashboard } from "./config";
import messages from "../../../constants/messages";
import {
  getUserRole
} from "../../../utils";
import "./styles.scss";

const { Text } = Typography;

const Dashboard = ({ history }) => {
  const userRole = getUserRole();
  const handleClick = useCallback(data => {
    if (data.route && data.route !== "") {
      history.push(data.route);
    }
  }, []);

  return (
    <div className="dashboardContainer">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24, xl: 24 }}
        style={{ margin: 0 }}
      >
        {
          RoleBasedDashboard.map(item => (
            item.supportingRole.indexOf(userRole) > -1
              ? <Col
                  xs={12} sm={12} md={8} lg={6} xl={6}
                  key={item.text}
                  className="dashboardRow"
                >
                  <div className="dashoboardCardContainer"
                    onClick={() => handleClick(item)}
                  >
                    <Icon
                      component={item.icon}
                      alt={messages.IMAGE_NOT_AVAILABLE}
                    />
                    <Text className="dashboardText">
                      { item.text }
                    </Text>
                  </div>
                </Col>
              : null
          ))
        }
      </Row>
    </div>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(Dashboard));
