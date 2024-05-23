import React from "react";

import {
  Row,
  Col,
  Typography
} from "antd";

import "./styles.scss";
import { PointsHTMLData } from "./config";
import { addCommaToNumber } from "../../../utils";
import messages from "../../../constants/messages";

const { Text } = Typography;

const PointModule = () => {
  return (
    <div className="paperContainer">
      {
        PointsHTMLData.map(item => (
          <Row key={item.text} className="pointRow">
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <img src={item.icon} alt={messages.IMAGE_NOT_AVAILABLE} />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Text className="pointsText">{ item.text }</Text>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
              <Text
                className="pointsValue"
                style={{
                  background: item.color
                }}
              >{ addCommaToNumber(item.value) }</Text>
            </Col>
          </Row>
        ))
      }
    </div>
  );
};

export default React.memo(PointModule);
