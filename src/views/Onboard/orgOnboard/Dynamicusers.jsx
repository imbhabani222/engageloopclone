import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  Form,
  Button,
  Input,
  Row,
  Col,
  Select
} from "antd";

import { PlusCircleOutlined, CloseCircleTwoTone } from "@ant-design/icons";

import { checkNumbervalue, checkAlphabets } from "../../../utils";
import constants from "../../../constants/constants";

import {
  defaultRequiredRule,
  defaultEmailRuleRestirct
} from "../../../config/Rules";
import { orgUserRole } from "../../../actions/orgActions";
import { rootPayload } from "../../../sampleJSON/onboard";

const {
  ONBOARD_STRING: {
    USERROLE,
    NAME,
    EMAILID,
    PHONENUMBER
  },
  ADDUSER
} = constants;

const { Option } = Select;

function DynamicUsers (props) {
  const dispatch = useDispatch();
  const [fCall, setfCall] = useState(true);
  const [orgUserRoles, setorgUserRoles] = useState([]);
  const orgUserRoleResponse = useSelector(
    state => state.orgReducer.orgUserRole,
    shallowEqual
  );
  useEffect(() => {
    if (orgUserRoleResponse.result) {
      setorgUserRoles(orgUserRoleResponse.result.data);
    }
  }, [orgUserRoleResponse]);

  useEffect(() => {
    if (fCall === true) {
      dispatch(orgUserRole(rootPayload));
    }
    setfCall(false);
  }, [orgUserRole]);

  const SelectRoles = orgUserRoles.map(({ roleName }) => {
    return (
      <Option key={roleName} value={roleName}>
        {roleName}
      </Option>
    );
  });
  return (
    <Form.List name="users">
      {(users, { add, remove }) => {
        return (
          <div>
            {users.map((field, index) => (
              <div key={field.key}>
                <Row>
                  <Col xs={24} sm={24} md={4} lg={6} xl={6}
                    className="gutter-row"
                  >
                    <h3>
                      {USERROLE} <span className="asterik">*</span>
                    </h3>
                    <div>
                      <Form.Item
                        name={[index, "roleName"]}
                        rules={[defaultRequiredRule]}
                      >
                        <Select
                          placeholder="Select a User Role"
                          className="roleSelection"
                        >
                          {SelectRoles}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={4} lg={6} xl={6}
                    className="gutter-row"
                  >
                    <h3>
                      {NAME} <span className="asterik">*</span>
                    </h3>
                    <div>
                      <Form.Item
                        name={[index, "name"]}
                        rules={[defaultRequiredRule]}
                      >
                        <Input placeholder="Name" maxLength={25}
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}/>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={4} lg={6} xl={6}
                    className="gutter-row"
                  >
                    <h3>
                      {EMAILID} <span className="asterik">*</span>
                    </h3>
                    <div>
                      <Form.Item
                        name={[index, "email"]}
                        rules={[defaultEmailRuleRestirct]}
                      >
                        <Input placeholder={EMAILID} />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={4} lg={5} xl={5}
                    className="gutter-row"
                  >
                    <h3>
                      {PHONENUMBER} <span className="asterik">*</span>
                    </h3>
                    <div>
                      <Form.Item
                        name={[index, "phoneNumber"]}
                        rules={[defaultRequiredRule]}
                      >
                        <Input placeholder="Phone Number"
                        onKeyPress={(event) => {
                          if (checkNumbervalue(event)) {
                            event.preventDefault();
                          }
                        }} />
                      </Form.Item>
                    </div>
                  </Col>
                  {users.length > 1
                    ? <Col xs={24} sm={24} md={4} lg={1} xl={1}
                      >
                      <div className="cross-icon">
                        <CloseCircleTwoTone onClick={() => remove(field.name)}/>
                      </div>
                    </Col>
                    : null
                  }
                </Row>
              </div>
            ))}
            {users.length < 2
              ? <Row>
                  <Col xs={24} sm={24} md={4} lg={6} xl={23}
                    className="btn-row"
                  >
                    <Button onClick={() => add()} className="userBtn">
                      <PlusCircleOutlined />  {ADDUSER}
                    </Button>
                  </Col>
                </Row>
              : null }
          </div>
        );
      }}
    </Form.List>
  );
}

export default React.memo(DynamicUsers);
