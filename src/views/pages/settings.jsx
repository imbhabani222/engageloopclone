/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import constants from "../../constants/constants";

import {
  Divider,
  Row,
  Col,
  Spin
} from "antd";
import {
  userProfile,
  clearuserProfile
} from "../../actions/actions";

const {
  USERPROFILE
} = constants;

const Settings = () => {
  const dispatch = useDispatch();
  const [tData, settData] = useState({});
  const userprofileResponse = useSelector(
    state => state.orgReducer.userProfile,
    shallowEqual
  );
  useEffect(() => {
    return () => {
      dispatch(clearuserProfile());
    };
  }, []);
  useEffect(() => {
    if (
      userprofileResponse.fetching === false && userprofileResponse.result === null
    ) {
      dispatch(userProfile());
    }
    if (userprofileResponse.result) {
      settData(userprofileResponse.result.user);
    }
  }, [userprofileResponse, userProfile]);

  const {
    designation,
    employeeId,
    managerEmail,
    firstName,
    name,
    email,
    phoneNumber,
    roleName,
    middelName,
    lastName
  } = tData;

  return (
    <>
  <Spin
    spinning={
      userprofileResponse.fetching
    }
    className="loader"
    size="large">
        <div className="page-title">
            <h2>{USERPROFILE}</h2>
        </div>
        <Divider className="divider" />
        <div className="page-body">
          <Row>
            <Col xs={10} sm={10} md={6} lg={4} xl={4} className="leftCol">
              <p>Name</p>
              <p>Email Address</p>
              <p>Phone Number</p>
              <p>Role</p>
              {designation ? <p>Designation</p> : ""}
              {employeeId ? <p>Employee ID</p> : ""}
              {managerEmail ? <p>Manager’s email Address</p> : ""}
            </Col>
            <Col xs={14} sm={14} md={16} lg={16} xl={16} className="rightCol">
              {firstName
                ? <p><span className="centerCol">:</span> {firstName} {middelName} {lastName}</p>
                : <p><span className="centerCol">:</span> {name}</p>}
              {email ? <p><span className="centerCol">:</span> {email}</p> : ""}
              {phoneNumber ? <p><span className="centerCol">:</span> {phoneNumber}</p> : ""}
              {roleName ? <p><span className="centerCol">:</span> {roleName}</p> : ""}
              {designation ? <p><span className="centerCol">:</span> {designation}</p> : ""}
              {employeeId ? <p><span className="centerCol">:</span> {employeeId}</p> : ""}
              {managerEmail ? <p><span className="centerCol">:</span> {managerEmail}</p> : ""}
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
};

export default React.memo(withRouter(Settings));
