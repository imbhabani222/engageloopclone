import React, { useState, useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import {
  Row,
  Col,
  Form,
  Input,
  Upload,
  Divider,
  Button,
  message,
  Spin,
  Select
} from "antd";
import axios from "axios";

import { PlusOutlined } from "@ant-design/icons";

import {
  orgOnboarding,
  clearOrgOnboarding,
  getorgCode,
  clearOrgCode
} from "../../../actions/orgActions";
import DynamicUsers from "./Dynamicusers";
import {
  checkNumbervalue,
  checkSpecialCharacter,
  checkAlphabets
} from "../../../utils";
import constants from "../../../constants/constants";
import messages from "../../../constants/messages";

import {
  defaultRequiredRule,
  defaultRequiredLimitRule
} from "../../../config/Rules";
import envConfig from "../../../config/env-urls";

const REACT_APP_ENV = process.env.REACT_APP_ENV;
const APIs = envConfig[REACT_APP_ENV].API;
const { Dragger } = Upload;
const {
  ONBOARD_STRING: {
    ORGCODE,
    ORGNAME,
    CINNUMBER,
    DOMAINNAME,
    GSTNUMBER,
    ADDRESSLINE1,
    ADDRESSLINE2,
    PHONE,
    CITY,
    STATE,
    PINCODE,
    COUNTRY,
    EMPLOYES
  },
  VIEWORG,
  ORGUSER,
  SAVEBTN,
  CANCELBTN,
  UPDLOADDESC,
  UPLOAD,
  EMPLOYE_OPTION_1,
  EMPLOYE_OPTION_2,
  ROUTES: {
    VIEWONBOARD
  }
} = constants;

const {
  FILE_SUPPORT_ERROR,
  USER_EMAIL
} = messages;

const { Option } = Select;

const orgOnboard = ({ history }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [orgCode, setOrgCode] = useState("");
  const [fileList, setfileList] = useState([]);
  const [file, setfile] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const onFinish = useCallback(values => {
    setisLoading(true);
    const {
      users
    } = values;

    if (users && users.length > 1) {
      if (users[0].email === users[1].email) {
        setisLoading(false);
        message.error({ USER_EMAIL });
      } else {
        dispatch(orgOnboarding(values));
      }
    } else {
      dispatch(orgOnboarding(values));
    }
  }, []);

  const orgOnboardResponse = useSelector(
    state => state.orgReducer.orgOnboarding,
    shallowEqual
  );
  const orgCodeResponse = useSelector(
    state => state.orgReducer.getorgCode,
    shallowEqual
  );

  useEffect(() => {
    if (orgCodeResponse.result) {
      setOrgCode(orgCodeResponse.result.orgCode);
    }
  }, [orgCodeResponse]);

  useEffect(() => {
    if (orgOnboardResponse.error) {
      message.error(orgOnboardResponse.error.message);
      dispatch(clearOrgOnboarding());
      setisLoading(false);
    } else if (orgOnboardResponse.result) {
      message.info(orgOnboardResponse.result.Message);
      setisLoading(false);
      dispatch(clearOrgOnboarding());
      dispatch(getorgCode());
      if (file && fileList.length > 0) {
        const formData = new FormData();
        formData.append("orgId", orgCode);
        formData.append("image", file.file);
        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };
        axios.post(
          `${APIs.baseURL}org/api/v1/add-logo`,
          formData,
          config
        );
      }
      setTimeout(() => {
        history.push(VIEWONBOARD);
      }, 200);
    }
  }, [orgOnboardResponse]);

  useEffect(() => {
    if (orgCodeResponse.result === null && !orgCodeResponse.fetching) {
      dispatch(getorgCode());
    }
  }, [getorgCode]);

  useEffect(() => {
    return () => {
      dispatch(clearOrgCode());
    };
  }, []);

  const beforeUpload = (file, onSuccess) => {
    const isJpgOrPng = file.type === "image/jpeg" ||
    file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(FILE_SUPPORT_ERROR);
      return Upload.LIST_IGNORE;
    } else {
      onSuccess("ok");
      return true;
    }
  };

  const handleChange = (info) => {
    setfileList(info.fileList);
    setfile(info);
  };

  const handleRemove = () => {
    setfile("");
    setfileList([]);
  };

  return (
    <Spin spinning={orgCodeResponse.fetching || isLoading}
      className="loader" size="large">
      <div className="form-area">
        <h2>{VIEWORG}</h2>
        <Divider className="divider"/>
        {orgCode
          ? <Form
              form={form}
              name="orgonboarding"
              autoComplete="off"
              onFinish={onFinish}
              initialValues={{ users: [""], orgCode }}
              className="orgonboarding"
            >
            <Row className="form-row_selection">
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{ORGCODE} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item name="orgCode">
                    <Input placeholder={ORGCODE} disabled={true} />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{ORGNAME} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                    name="orgName"
                    rules={[defaultRequiredRule]}
                  >
                    <Input placeholder={ORGNAME} maxLength={50} />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{CINNUMBER}</h3>
                <div>
                  <Form.Item
                    name="cinNumber"
                  >
                    <Input placeholder={CINNUMBER}
                      maxLength={21} onKeyPress={(event) => {
                        if (checkSpecialCharacter(event)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{GSTNUMBER} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                    name="gstNumber"
                    rules={[defaultRequiredRule]}
                  >
                    <Input
                      placeholder={GSTNUMBER}
                      maxLength={15}
                      onKeyPress={(event) => {
                        if (checkSpecialCharacter(event)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{DOMAINNAME} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                    name="orgDomain"
                    rules={[defaultRequiredRule]}
                  >
                    <Input placeholder={DOMAINNAME}
                    maxLength={25} className="domainName" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>
                {ADDRESSLINE1} <span className="asterik">*</span>
                </h3>
                <div>
                  <Form.Item
                    name="addressLine1"
                    rules={[defaultRequiredRule]}
                  >
                    <Input placeholder={ADDRESSLINE1}/>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{ADDRESSLINE2}</h3>
                <div>
                  <Form.Item name="addressLine2">
                    <Input placeholder={ADDRESSLINE2}/>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{PHONE} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                    name="phoneNumber"
                    rules={[defaultRequiredRule]}
                    >
                      <Input placeholder={PHONE}
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <h3>{CITY} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                    name="city"
                    rules={[defaultRequiredRule]}
                  >
                    <Input placeholder={CITY}
                    onKeyPress={(event) => {
                      if (checkAlphabets(event)) {
                        event.preventDefault();
                      }
                    }}/>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row" >
                <h3>{STATE} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                      name="state"
                      rules={[defaultRequiredRule]}
                    >
                      <Input placeholder={STATE}
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row" >
                <h3>{EMPLOYES} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                      name="totalEmployees"
                      rules={[defaultRequiredRule]}
                    >
                      <Select
                          placeholder="Select a Number of Employes"
                          className="roleSelection"
                        >
                          <Option value={EMPLOYE_OPTION_1}
                              className="selectOption">
                            {EMPLOYE_OPTION_1}
                          </Option>
                          <Option value={EMPLOYE_OPTION_2}
                            className="selectOption">
                            {EMPLOYE_OPTION_2}
                          </Option>
                        </Select>
                    </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row" >
                <h3>{PINCODE} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                      name="pincode"
                      rules={[defaultRequiredRule, defaultRequiredLimitRule]}
                    >
                      <Input placeholder={PINCODE}
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}
                      maxLength={6} minLength={5}/>
                    </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={4} lg={4} xl={4} className="gutter-row" >
                <h3>{COUNTRY} <span className="asterik">*</span></h3>
                <div>
                  <Form.Item
                      name="country"
                      rules={[defaultRequiredRule]}
                  >
                      <Input placeholder={COUNTRY}
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}/>
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8} className="gutter-row" >
                <div>
                  <Dragger className="image-dragger" maxCount={1}
                  listType="picture-card"
                  fileList={fileList}
                  showUploadList={{ showPreviewIcon: false }}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                  onRemove={handleRemove}
                  >
                  {fileList.length >= 1
                    ? null
                    : <Row>
                      <Col span="5" offset={1}>
                        <p className="uploader">
                          <PlusOutlined />
                          <span className="uploadTitle">{UPLOAD}</span>
                        </p>
                      </Col>
                      <Col span="18" className="image-dragger__description">
                        <p>{UPDLOADDESC}</p>
                      </Col>
                    </Row> }
                </Dragger>
                </div>
              </Col>
            </Row>
            <Divider className="divider"/>
            <div className="form-user-section">
              <Row className="form-user-row">
                <Col span={24}>
                  <h2>{ORGUSER}</h2>
                </Col>
              </Row>
              <Divider className="divider"/>
                <Row className="form-row">
                  <Col span={24}>
                    <DynamicUsers />
                  </Col>
              </Row>
            </div>
            <Row className="form-row_selection">
              <Col span={22} className="add-btn">
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
          : null }
      </div>
    </Spin>
  );
};

orgOnboard.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(orgOnboard));
