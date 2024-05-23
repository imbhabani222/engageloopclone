import React, { useEffect, useState } from "react";
import { Menu, Row, Col } from "antd";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";

const {
  ROUTES: {
    ONBOARD,
    VIEWONBOARD
  },
  ORGANIZATION,
  VIEWORGANIZATION,
  SUBMENU_KEY_1,
  SUBMENU_KEY_2
} = constants;
const SubMenu = ({ history }) => {
  const location = useLocation();
  const [currentKey, setcurrentKey] = useState(SUBMENU_KEY_1);
  const handleClick = (e) => {
    setcurrentKey(e.key);
    if (e.key === SUBMENU_KEY_1) {
      history.push(ONBOARD);
    }
    if (e.key === SUBMENU_KEY_2) {
      history.push(VIEWONBOARD);
    }
  };
  useEffect(() => {
    if (location.pathname === ONBOARD) {
      setcurrentKey(SUBMENU_KEY_1);
    } else if (location.pathname === VIEWONBOARD) {
      setcurrentKey(SUBMENU_KEY_2);
    } else {
      setcurrentKey(SUBMENU_KEY_1);
    }
  });
  return (
    <div className="header-sub-link">
    <Row>
    <Col span={24}>
    <Menu mode="horizontal" onClick={handleClick} selectedKeys={[currentKey]}>
      <Menu.Item className="first-sub-menu" key={SUBMENU_KEY_1}>
        {ORGANIZATION}
      </Menu.Item>
      <Menu.Item key={SUBMENU_KEY_2}>{VIEWORGANIZATION}</Menu.Item>
    </Menu>
    </Col>
  </Row>
    </div>
  );
};

SubMenu.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(SubMenu));
