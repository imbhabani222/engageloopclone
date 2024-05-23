import React from "react";

import {
  Row,
  Col
} from "antd";

import Settings from "./settings";
import ContactUs from "./contactUs";
import CookiePreferences from "./cookiePreferences";
import TermsConditions from "./termsConditions";
import PrivacyPolicy from "./privacyPolicy";
import { withRouter, useLocation } from "react-router-dom";
import constants from "../../constants/constants";

import "antd/dist/antd.css";
import "./mainPageLayout.scss";

const {
  ROUTES: {
    CONTACT_US,
    SETTINGS,
    TERMSANDACONDITIONS,
    PRIVACYPOLICY,
    COOKIEPREFERENCES
  },
  SETTINGS_TITILE,
  CONTACTUS_TITILE,
  COOKIE_PRERENCES_TITILE,
  PRIVACYPOLICY_TITILE,
  TERMS_CONDITIOND_TITILE
} = constants;

const Onboard = () => {
  const location = useLocation();
  return (
    <div>
      <div className="content-root">
       <h2 className="title">
       {location.pathname === SETTINGS ? SETTINGS_TITILE : null }
            {location.pathname === CONTACT_US ? CONTACTUS_TITILE : null }
            {location.pathname === TERMSANDACONDITIONS
              ? TERMS_CONDITIOND_TITILE
              : null }
            {location.pathname === PRIVACYPOLICY
              ? PRIVACYPOLICY_TITILE
              : null }
            {location.pathname === COOKIEPREFERENCES
              ? COOKIE_PRERENCES_TITILE
              : null }
       </h2>
        <div className="site-layout-content">
          <Row>
            <Col span={24}>
            {location.pathname === SETTINGS ? <Settings /> : null }
            {location.pathname === CONTACT_US ? <ContactUs /> : null }
            {location.pathname === TERMSANDACONDITIONS
              ? <TermsConditions />
              : null }
            {location.pathname === PRIVACYPOLICY
              ? <PrivacyPolicy />
              : null }
            {location.pathname === COOKIEPREFERENCES
              ? <CookiePreferences />
              : null }
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default React.memo(withRouter(Onboard));
