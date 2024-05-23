import React, { useCallback, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Row,
  Col,
  Form,
  Input,
  Divider,
  Button,
  message,
  Spin
} from "antd";

import {
  checkSpecialCharacter,
  checkAlphabets,
  checkNumbervalue,
  getUserOrgCode
} from "../../../utils";
import constants from "../../../constants/constants";

import {
  defaultRequiredRule,
  defaultEmailRuleRestirct
} from "../../../config/Rules";

import Import from "../Import/Import";
import {
  onboardEmployee,
  clearonboardEmployee
} from "../../../actions/orgActions";

const {
  SAVEBTN,
  CANCELBTN,
  EMPLOYEE: {
    EMPDETAILS,
    FIRSTNAME,
    LASTNAME,
    MIDDLENAME,
    OFFICALEMAILADDRESS,
    PHONENUMBER,
    MANAGEREMAILADDRESS,
    EMPLOYEEID,
    DESIGNATION
  },
  ROUTES: {
    VIEWALLEMPLOYEE
  }
} = constants;

const orgOnboard = ({ history }) => {
  const [form] = Form.useForm();
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const empOnboardResponse = useSelector(
    state => state.orgReducer.onboardEmployee,
    shallowEqual
  );

  const onFinish = useCallback(values => {
    setisLoading(true);
    const {
      firstName,
      middleName,
      lastName,
      email,
      managerEmail,
      phoneNumber,
      employeeId,
      designation
    } = values;
    dispatch(onboardEmployee({
      firstName,
      middleName,
      lastName,
      email,
      managerEmail,
      phoneNumber,
      employeeId,
      orgId: getUserOrgCode,
      designation
    }));
  });
  useEffect(() => {
    if (empOnboardResponse.error) {
      setisLoading(false);
      message.info(empOnboardResponse.error.message);
      dispatch(clearonboardEmployee());
    } else if (empOnboardResponse.result) {
      setisLoading(false);
      message.info(empOnboardResponse.result.message);
      dispatch(clearonboardEmployee());
      history.push(VIEWALLEMPLOYEE);
    }
  }, [empOnboardResponse]);

  return (
    <Spin
    spinning={
      empOnboardResponse.fetching || isLoading
    }
    className="loader"
    size="large">
      <div className="emp-form-area">
        <Row>
          <Col span={20}>
            <h2>{EMPDETAILS}</h2>
          </Col>
          <Col span={4} className="import">
            <Import />
          </Col>
        </Row>
        <Divider className="divider"/>
          <Form
              form={form}
              name="employeeonboard"
              autoComplete="off"
              className="orgonboarding"
              onFinish={onFinish}
            >
            <Row className="form-row_selection">
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{FIRSTNAME} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item name="firstName"
                   rules={[defaultRequiredRule]}>
                    <Input placeholder={FIRSTNAME}
                    maxLength={21} onKeyPress={(event) => {
                      if (checkAlphabets(event)) {
                        event.preventDefault();
                      }
                    }}/>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{MIDDLENAME}</h3>
                <div>
                  <Form.Item
                    name="middleName"
                  >
                    <Input placeholder={MIDDLENAME}
                    maxLength={21} onKeyPress={(event) => {
                      if (checkAlphabets(event)) {
                        event.preventDefault();
                      }
                    }} />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{LASTNAME} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                    name="lastName"
                    rules={[defaultRequiredRule]}
                  >
                    <Input placeholder={LASTNAME}
                      maxLength={21} onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{OFFICALEMAILADDRESS}
                <span className="asterik">*</span></h3>
                <div>
                  <Form.Item name="email"
                    rules={[defaultEmailRuleRestirct]}
                  >
                    <Input placeholder={OFFICALEMAILADDRESS} />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{PHONENUMBER}</h3>
                <div>
                  <Form.Item
                    name="phoneNumber"
                  >
                    <Input placeholder={PHONENUMBER} maxLength={10}
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}/>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{EMPLOYEEID} <span className="asterik">
                  *</span></h3>
                <div>
                  <Form.Item
                    name="employeeId"
                    rules={[defaultRequiredRule]}
                  >
                    <Input placeholder={EMPLOYEEID}
                      maxLength={21} onKeyPress={(event) => {
                        if (checkSpecialCharacter(event)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{DESIGNATION} <span className="asterik">
                  *</span></h3>
                <div>
                  <Form.Item
                    name="designation"
                    rules={[defaultRequiredRule]}
                  >
                    <Input placeholder={DESIGNATION}
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}/>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7} className="gutter-row" >
                <h3>{MANAGEREMAILADDRESS} <span className="asterik">
                  *</span></h3>
                <div>
                  <Form.Item
                    name="managerEmail"
                    rules={[defaultEmailRuleRestirct]}
                  >
                    <Input placeholder={MANAGEREMAILADDRESS} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Divider className="divider"/>
              </Col>
            </Row>
            <Row className="form-row_selection">
              <Col span={21} className="add-btn">
                <Button
                  type="ghost"
                  className="btn-white"
                  onClick={() => { form.resetFields(); }}
                >{CANCELBTN}</Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  className="btn-primary"
                >{SAVEBTN}</Button>
              </Col>
              </Row>
          </Form>
      </div>
    </Spin>
  );
};

orgOnboard.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(orgOnboard));
