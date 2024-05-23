/* eslint-disable no-prototype-builtins */
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withRouter } from "react-router-dom";

import { Row, Col, Typography } from "antd";

import { FooterData } from "../../config/Footer";
import "./styles.scss";

const { Text } = Typography;

const AppFooter = ({ history }) => {
  const handleClick = useCallback(item => {
    if (item.hasOwnProperty("route")) {
      history.push(item.route);
    }
  }, []);

  return (
    <Row className="footerContainer">
      <Col span={24} className="footerRow">
      {
        FooterData.map(item => (
          <div
            key={item.label}
            className={clsx({ clickableSpan: item.hasOwnProperty("route") })}
            onClick={() => handleClick(item)}
          >
            <Text>{ item.label }</Text>
          </div>
        ))
      }
      </Col>
    </Row>
  );
};

AppFooter.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(AppFooter));
