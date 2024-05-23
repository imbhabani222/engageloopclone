import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  Table,
  Divider,
  Input,
  Row,
  Col,
  Spin,
  message
} from "antd";

import { columns } from "./columns";
import constants from "../../../constants/constants";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  getEmployeeDetails,
  clearEmployeeDetails,
  empreActivate,
  clearempreActivate
} from "../../../actions/orgActions";

const { Search } = Input;
const {
  EMPLOYEE: {
    VIEWEMP,
    TOTALUSERS
  }
} = constants;

const ViewOnboard = () => {
  const dispatch = useDispatch();
  const [tData, settData] = useState([]);
  const [count, setcount] = useState("");
  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const employeeResponse = useSelector(
    state => state.orgReducer.getEmployeeDetails,
    shallowEqual
  );
  const empreactivateResponse = useSelector(
    state => state.orgReducer.empreActivate,
    shallowEqual
  );
  useEffect(() => {
    return () => {
      dispatch(clearEmployeeDetails());
    };
  }, []);
  useEffect(() => {
    if (
      employeeResponse.result === null &&
      !employeeResponse.fetching
    ) {
      dispatch(getEmployeeDetails());
    }
    if (employeeResponse.result) {
      settData(employeeResponse.result.data);
      setcount(employeeResponse.result.totalEmployeeCount);
      setpageSize(employeeResponse.result.currentEmployeeCount);
    }
  }, [employeeResponse, getEmployeeDetails]);

  const handleSearch = (e) => {
    setpage(1);
    const params = `searchQuery=${e}`;
    dispatch(getEmployeeDetails(params));
  };
  const handleReactive = (e) => {
    const payload = {
      email: e.email
    };
    dispatch(empreActivate(payload));
  };

  useEffect(() => {
    if (empreactivateResponse.result) {
      message.info(empreactivateResponse.result.message);
      dispatch(clearempreActivate());
      const params = `limit=${pageSize}&pageNumber=${page}`;
      dispatch(getEmployeeDetails(params));
    }
  }, [empreactivateResponse]);

  const handleOnChange = (pagination, filters, sorter) => {
    if (sorter.columnKey) {
      const params =
      `limit=${pagination.pageSize}&pageNumber=${pagination.current}`;
      const direction = sorter.order === "descend" ? "dsc" : "asc";
      const payload = params +
      `&sort=${sorter.columnKey}&sortDirection=${direction}`;
      dispatch(getEmployeeDetails(payload));
    } else {
      const params =
      `limit=${pagination.pageSize}&pageNumber=${pagination.current}`;
      dispatch(getEmployeeDetails(params));
    }
  };
  return (
    <Spin
    spinning={
      employeeResponse.fetching ||
      employeeResponse.fetching ||
      employeeResponse.fetching
    }
    className="loader"
    size="large"
  >
    <div className="emp-form-area">
      <Row className="headerCol">
        <Col xs={24} sm={24} md={12} lg={5} xl={5} className="headerTitle">
          <h2>{VIEWEMP}</h2>
        </Col>
        <Col xs={1} sm={1} md={0} lg={0} xl={0} />
        <Col xs={11} sm={11} md={6} lg={6} xl={6} className="searchrow">
        <Search placeholder="Search"
          onSearch={handleSearch} enterButton
          allowClear={true} className="searchBox"/>
        </Col>
        <Col xs={10} sm={10} md={6} lg={13} xl={13} className="users">
        {TOTALUSERS}: {employeeResponse && employeeResponse.result
          ? employeeResponse.result.totalEmployeeCount
          : null}
        </Col>
      </Row>
      <Divider className="divider"/>
      <div className="view-container-root">
        <Table
          columns={columns(handleReactive)}
          dataSource={tData}
          className="tableempView"
          pagination= {{
            defaultCurrent: page,
            defaultPageSize: pageSize,
            total: count
          }}
          scroll={{ x: 1000 }}
          onChange={handleOnChange}
        />
      </div>
      </div>
      </Spin>
  );
};

ViewOnboard.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(ViewOnboard));
