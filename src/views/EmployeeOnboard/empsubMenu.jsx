import React, { useEffect, useState } from "react";
import { Menu, Row, Col } from "antd";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";

const {
  ROUTES: {
    ONBOARDEMPLOYEE,
    VIEWALLEMPLOYEE
  },
  EMPLOYEE: {
    ONBOARDEMP,
    VIEWEMP
  },
  SUBMENU_KEY_1,
  SUBMENU_KEY_2
} = constants;
const EmpSubMenu = ({ history }) => {
  const location = useLocation();
  const [currentKey, setcurrentKey] = useState(SUBMENU_KEY_1);
  const handleClick = (e) => {
    setcurrentKey(e.key);
    if (e.key === SUBMENU_KEY_1) {
      history.push(ONBOARDEMPLOYEE);
    }
    if (e.key === SUBMENU_KEY_2) {
      history.push(VIEWALLEMPLOYEE);
    }
  };
  useEffect(() => {
    if (location.pathname === ONBOARDEMPLOYEE) {
      setcurrentKey(SUBMENU_KEY_1);
    } else if (location.pathname === VIEWALLEMPLOYEE) {
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
        {ONBOARDEMP}
      </Menu.Item>
      <Menu.Item key={SUBMENU_KEY_2}>{VIEWEMP}</Menu.Item>
    </Menu>
    </Col>
  </Row>
    </div>
  );
};

EmpSubMenu.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(EmpSubMenu));
