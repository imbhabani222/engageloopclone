import React from "react";

import {
  Row,
  Col
} from "antd";

import phIcons from "../../assets/img/icons/phone-icons.png";
import constants from "../../constants/constants";
import moment from "moment";
import "./styles.scss";

const currentDate = moment().format("ddd, DD MMM YYYY");
const {
  SUBHEADER,
  PHNUMBER
} = constants;

const AppSubHeader = () => {
  return (
    <Row className="subheader">
    <Col xs={0} sm={0} md={12} lg={12} xl={12} className="subheader_text">
        {SUBHEADER}
      </Col>
      <Col xs={11} sm={11} md={8} lg={6} xl={6} offset={1}>
        <img src={phIcons} className="icons"/><span>{PHNUMBER}</span>
      </Col>
      <Col xs={10} sm={11} md={4} lg={4} xl={4} className="subheader_time_text">
        {currentDate}
      </Col>
    </Row>
  );
};

export default React.memo(AppSubHeader);
