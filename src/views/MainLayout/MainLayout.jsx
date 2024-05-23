import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import {
  Layout,
  Row,
  Col,
  Button
} from "antd";

import MenuSideBarIcon from "../../components/MenuSideBarIcon/MenuSideBarIcon";
import MenuSideBar from "../../components/MenuSideBar/MenuSideBar";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
import constants from "../../constants/constants";

import "./styles.scss";
import {
  getUserRole
} from "../../utils";

const { Footer, Content, Sider } = Layout;

const {
  MAIL,
  USER_FEEDBACK,
  ROLES: {
    ADMIN
  }
} = constants;

const MainLayout = ({ component, userAuthorized }) => {
  const [menuSideBarVisible, setMenuSideBarVisible] = useState(false);
  const handleMenuSideBar = useCallback(() => {
    setMenuSideBarVisible(true);
  }, []);

  const handleClose = useCallback((data = null) => {
    setMenuSideBarVisible(false);
  }, []);
  const userRole = getUserRole();
  const handleFeedback = () => {
    window.location = MAIL;
  };
  return (
    <Layout>
      {
        userAuthorized
          ? <>
            <Sider className="sider">
              <MenuSideBarIcon
                handleClose={handleClose}
                handleMenuSideBar={handleMenuSideBar} />
                <MenuSideBar
                    visible={menuSideBarVisible}
                    handleClose={handleClose}
                />
            </Sider>
            <Layout>
              <AppHeader handleMenuSideBar={handleMenuSideBar} />
              <Content style={{ display: "flex" }}>
                <Row className="rowContentContainer">
                  <Col xs={0} sm={0} md={1} lg={1} xl={1} />
                  <Col xs={24} sm={24} md={22} lg={22} xl={22} >
                    <div className="contentContainer">
                      { component }
                    </div>
                  </Col>
                </Row>
              </Content>
              <Footer className="footerPanel">
                <AppFooter />
                {userRole !== ADMIN
                  ? <Button className="btn-primary feedback" type="primary"
                  onClick={handleFeedback}>
                  {USER_FEEDBACK}</Button>
                  : null }
              </Footer>
            </Layout>
          </>
          : <Content>
              { component }
            </Content>
       }
     </Layout>
  );
};

MainLayout.propTypes = {
  component: PropTypes.node,
  userAuthorized: PropTypes.bool
};

MainLayout.defaultProps = {
  userAuthorized: false
};

export default React.memo(MainLayout);
