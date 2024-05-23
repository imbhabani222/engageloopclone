import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  Row,
  Col,
  Typography,
  Spin
} from "antd";
import constants from "../../../constants/constants";
import messages from "../../../constants/messages";

import Icon from "@ant-design/icons";

import {
  ReactComponent as ActivityIcon
} from "../../../assets/img/Activity/Activity.svg";
import {
  ReactComponent as MessageIcon
} from "../../../assets/img/Activity/Message.svg";
import {
  getActivityLog,
  clearActivityLog
} from "../../../actions/dashboardActions";
import { getUserRole, dateConvert } from "../../../utils";

import "./styles.scss";

const { Text } = Typography;
const {
  ACTIVITY_LOG_LABEL,
  ROLES: {
    EMPLOYEE
  }
} = constants;
const {
  NO_ACTIVITY_AVAILABLE,
  UNABLE_TO_LOAD_ACTIVITY,
  RECORD_NOT_FOUND
} = messages;

const ActivityLog = () => {
  const dispatch = useDispatch();
  const userRole = getUserRole();
  const activityResponse = useSelector(
    state => state.dashboardReducer.getActivityLog,
    shallowEqual
  );
  useEffect(() => {
    return () => {
      dispatch(clearActivityLog());
    };
  }, []);
  useEffect(() => {
    if (
      activityResponse.result === null &&
      activityResponse.error === null &&
      !activityResponse.fetching && userRole !== EMPLOYEE
    ) {
      dispatch(getActivityLog());
    }
  }, [activityResponse, getActivityLog]);

  return (
    <div className="paperContainer">
      <Row>
        <Col span={24}>
          <div className="activityHeader">
            <Icon component={ActivityIcon} className="activityIcon" />
            <Text>{ ACTIVITY_LOG_LABEL }</Text>
          </div>
        </Col>
        <Spin
              spinning={activityResponse.fetching}
              className="spinloader"
              size="large"
            />
        <Col span={24}>
          <div className="activityMessagesContainer">
            <Row>
              {
                activityResponse.result &&
                activityResponse.result.data &&
                activityResponse.result.data.length &&
                activityResponse.result.data.map(item => (
                <Col span={24} key={item.text}>
                    <div className="activityMessageContainer">
                      <Icon component={MessageIcon} />
                      <div>
                        <Text>
                          {item.item} {item.action} {item.message}</Text>
                        <Text>{dateConvert(item.timeStamp)}</Text>
                      </div>
                    </div>
                </Col>
                ))
              }
            </Row>
            {
              userRole === EMPLOYEE
                ? <Text>{ RECORD_NOT_FOUND}</Text>
                : null
            }
            {
              !activityResponse.fetching
                ? <Text>
                  {
                    activityResponse.error
                      ? UNABLE_TO_LOAD_ACTIVITY
                      : null
                  }
                  {
                    (
                      activityResponse.result &&
                      activityResponse.result.data &&
                      !activityResponse.result.data.length
                    )
                      ? NO_ACTIVITY_AVAILABLE
                      : null
                  }
                </Text>
                : null
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(ActivityLog);
