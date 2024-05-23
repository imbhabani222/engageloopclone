import React, { useCallback } from "react";
import { withRouter, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { Drawer, Row, Col, Typography, Divider } from "antd";
import Icon from "@ant-design/icons";

import "./styles.scss";
import "antd/dist/antd.css";
import colors from "../../constants/colors";
import messages from "../../constants/messages";
import EngageLoopImage from "../../assets/img/engageloop.png";

import { SidebarFirst } from "../../config/MenuSidebar";
import { ReactComponent as ArrowLeft } from "../../assets/img/arrowLeft.svg";
import { ReactComponent as ArrowRight }
  from "../../assets/img/arrowRightIcon.svg";
import constants from "../../constants/constants";

import {
  getUserRole
} from "../../utils";

const { Text } = Typography;
const {
  IMAGE_NOT_AVAILABLE
} = messages;

const {
  ROUTES: {
    HOME
  }
} = constants;

const MenuSideBar = ({ handleClose, visible, history }) => {
  const userRole = getUserRole();
  const location = useLocation();
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

  const handleLogoClick = () => {
    history.push(HOME);
  };

  return (
    <Drawer
      title={
        <>
         <Icon
            component={ArrowLeft}
            className="backIcon"
            onClick={handleClose}
        />
          <img
            src={EngageLoopImage}
            alt={IMAGE_NOT_AVAILABLE}
            className="mebuSidebarLogo"
            onClick={handleLogoClick}
          />
        </>
      }
      placement="left"
      closable={false}
      onClose={handleClose}
      visible={visible}
      maskStyle={{
        backgroundColor: colors.backdropColor,
        opacity: 0.63
      }}
      bodyStyle={{
        background: colors.menuSideBarColor,
        padding: "0"
      }}
      headerStyle={{
        background: colors.whiteColor,
        borderColor: colors.menuSideBarBorderColor,
        padding: "10px 24px"
      }}
      width={366}
    >
      <div className="tempSidebar"></div>
      <Row className="menuSideRow">
        {
          SidebarFirst.map(item => (
            item.supportingRole.indexOf(userRole) > -1
              ? <Col
              xs={24} sm={24} md={24} lg={24} xl={24}
              key={item.text}
              className={item.route === location.pathname
                ? "menuContainer active"
                : "menuContainer"}
              onClick={() => handleClick(item)}
            >
              <div>
                <Icon
                  component={item.icon}
                  className={item.additionalClass}
                />
              </div>
              <div>
                <Text className="textClass">{ item.text }</Text>
                <Icon
                  component={ArrowRight}
                  className="textWithRightArrow"
                />
              </div>
            </Col>
              : null
          ))
        }
      </Row>
      <Divider className="menuDivider"/>
    </Drawer>
  );
};

MenuSideBar.propTypes = {
  handleClose: PropTypes.func,
  visible: PropTypes.bool,
  history: PropTypes.object
};

export default React.memo(withRouter(MenuSideBar));
