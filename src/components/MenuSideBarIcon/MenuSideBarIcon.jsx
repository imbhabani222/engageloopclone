import React, { useCallback } from "react";
import { withRouter, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Row, Col
} from "antd";
import Icon from "@ant-design/icons";

import { ReactComponent as MenuIcon } from "../../assets/img/menuIcon.svg";

import "./styles.scss";
import { SidebarFirst } from "../../config/MenuSidebar";
import {
  getUserRole
} from "../../utils";

const MenuSideBarIcon = ({ history, handleClose, handleMenuSideBar }) => {
  const location = useLocation();
  const userRole = getUserRole();
  const handleClick = useCallback(item => {
    if (item.route) {
      handleClose();
      history.push(item.route);
    } else if (item.popover) {
      handleClose({
        action: item.onClickAction,
        worker: item.route || item.popover
      });
    }
  }, []);

  return (
    <div className="menuSideBarIconContainer">
      <Row>
        <Col span={24}>
        <div className="menuSidebarIcons">
        <Icon component={MenuIcon}
          onClick={handleMenuSideBar} className="iconSvg"/>
        </div>
        </Col>
        {
          SidebarFirst.map(item => (
            item.supportingRole.indexOf(userRole) > -1
              ? <Col span={24} key={item.text}>
              <div className={`menuSidebarIcon ${item.additionalClass}
                  ${item.route === location.pathname ? "active" : null}`}>
                <Icon component={item.icon} onClick={() => handleClick(item)} />
              </div>
            </Col>
              : null
          ))
        }
      </Row>
    </div>
  );
};

MenuSideBarIcon.propTypes = {
  handleClose: PropTypes.func,
  history: PropTypes.object,
  handleMenuSideBar: PropTypes.func
};

export default React.memo(withRouter(MenuSideBarIcon));
