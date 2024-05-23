import React, { useCallback, useEffect } from "react";

import {
  Layout,
  Menu,
  Row,
  Col,
  Dropdown,
  message
} from "antd";

import Icon from "@ant-design/icons";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Cookies from "universal-cookie";

import AppSubHeader from "../AppSubHeader/AppSubHeader";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import { clearLogoutUser, logoutUser } from "../../actions/actions";
import { loginSampleData } from "../../sampleJSON/login";
import { withRouter } from "react-router";
import { ReactComponent as PersonIcon } from "../../assets/img/person.svg";
import { ReactComponent as ArrowIcon } from "../../assets/img/arrowDown.svg";

import engageLogo from "../../assets/img/engageloop.png";
import "./styles.scss";

import { ReactComponent as MenuIcon } from
  "../../assets/img/menuMobileIcon.svg";

const { Header } = Layout;
const {
  MYACCOUNT_LABEL,
  ROUTES: {
    LOGIN,
    HOME,
    SETTINGS
  },
  LOGOUT_LABEL
} = constants;

const cookies = new Cookies();

const AppHeader = ({ history, handleMenuSideBar }) => {
  const dispatch = useDispatch();
  const logoutResponse = useSelector(
    state => state.appReducer.logoutUser || null,
    shallowEqual
  );

  useEffect(() => {
    if (logoutResponse.error) {
      message.info(logoutResponse.error.message);
    } else if (logoutResponse.result) {
      cookies.remove("elToken");
      cookies.remove("elUserRole");
      dispatch(clearLogoutUser());
      history.push(LOGIN);
    }
  }, [logoutResponse]);

  const handleOk = useCallback(() => {
    dispatch(logoutUser({
      orgId: loginSampleData.orgId
    }));
  }, []);

  const handleClick = () => {
    history.push(HOME);
  };

  const handleAccount = () => {
    history.push(SETTINGS);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={handleOk}>
          {LOGOUT_LABEL}
      </Menu.Item>
    </Menu>
  );
  return (
    <>
    <AppSubHeader />
    <Row className="headerRow">
       <Col xs={1} sm={1} md={1} lg={1} xl={1} />
       <Col xs={2} sm={2} md={0} lg={0} xl={0} className="mobileIcon">
      <Icon component={MenuIcon}
          onClick={handleMenuSideBar} className="iconSvg"/>
      </Col>
      <Col xs={19} sm={19} md={22} lg={22} xl={22}>
        <Header>
            <div className="logo">
              <a onClick={handleClick}>
                <img src={engageLogo} />
              </a>
            </div>
            <div className="menu">
              <div>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link"
                   onClick={handleAccount}>
                    <Icon component={PersonIcon} className="personIcon" />
                    <span className="accountLabel">{MYACCOUNT_LABEL}</span>
                    <Icon component={ArrowIcon} className="arrowIcon" />
                  </a>
                </Dropdown>
              </div>
            </div>
        </Header>
      </Col>
    </Row>
    </>
  );
};

AppHeader.propTypes = {
  history: PropTypes.object,
  handleMenuSideBar: PropTypes.func
};

export default React.memo(withRouter(AppHeader));
