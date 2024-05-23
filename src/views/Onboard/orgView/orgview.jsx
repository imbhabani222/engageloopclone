import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  Table,
  Divider,
  Input,
  Row,
  Col,
  Modal,
  message,
  Spin
} from "antd";

import {
  getTenants,
  clearGetTenants,
  getTenantsDetails,
  clearTenantsDetails,
  changeTenantsStatus,
  clearchangeTenantsStatus,
  reActivate,
  clearreActivate
} from "../../../actions/orgActions";

import { orgColumns } from "./columns";
import constants from "../../../constants/constants";
import noImage from "../../../assets/img/noImage.png";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

const {
  VIEWORG,
  ORGVIEW_OVERLAY: {
    DETAILS,
    CODE,
    GSTIN,
    CIN,
    DOMAIN,
    ADDRESS,
    USERS,
    LOGO,
    PHONE
  },
  ROUTES: {
    EDITORG
  }
} = constants;

const { Search } = Input;

const ViewOnboard = ({ history }) => {
  const dispatch = useDispatch();
  const [tData, settData] = useState([]);
  const [tDetails, settDetails] = useState({});
  const [tUsers, settUsers] = useState([]);
  const [Logo, settLogo] = useState("");
  const [isModalVisible, settisModalVisible] = useState(false);
  const [count, setcount] = useState("");
  const [page, setpage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [DomainName, setDomainName] = useState("");

  const tenantsResponse = useSelector(
    state => state.orgReducer.getTenants,
    shallowEqual
  );
  const tenantsDetailsResponse = useSelector(
    state => state.orgReducer.getTenantsDetails,
    shallowEqual
  );
  const tenantsStatusResponse = useSelector(
    state => state.orgReducer.changeTenantsStatus,
    shallowEqual
  );
  const reactivateResponse = useSelector(
    state => state.orgReducer.reActivate,
    shallowEqual
  );

  useEffect(() => {
    return () => {
      dispatch(clearGetTenants());
      dispatch(clearTenantsDetails());
      dispatch(clearchangeTenantsStatus());
    };
  }, []);

  useEffect(() => {
    if (
      tenantsResponse.result === null &&
      !tenantsResponse.fetching
    ) {
      dispatch(getTenants());
    }
    if (tenantsResponse.result) {
      settData(tenantsResponse.result.data.tenants);
      setcount(tenantsResponse.result.data.tenantsCount);
      setpageSize(tenantsResponse.result.data.currentTenantCount);
    }
  }, [tenantsResponse, getTenants]);

  useEffect(() => {
    if (tenantsDetailsResponse.result) {
      settDetails(tenantsDetailsResponse.result.tenant);
      settUsers(tenantsDetailsResponse.result.users);
      settLogo(tenantsDetailsResponse.result.Logo);
    }
  }, [tenantsDetailsResponse]);

  useEffect(() => {
    if (tenantsStatusResponse.result) {
      message.info(tenantsStatusResponse.result.message);
      dispatch(clearchangeTenantsStatus());
      const params = `limit=${pageSize}&pageNumber=${page}`;
      dispatch(getTenants(params));
    }
  }, [tenantsStatusResponse]);

  useEffect(() => {
    if (reactivateResponse.result) {
      message.info(reactivateResponse.result.message);
      dispatch(clearreActivate());
      const params = `limit=${pageSize}&pageNumber=${page}`;
      dispatch(getTenants(params));
    }
  }, [reactivateResponse]);

  const showModal = (e) => {
    const da = window.location.href.split("/");
    const da1 = da[2].split(".");
    da1.shift();
    const url = da1.toString();
    setDomainName(url.replace(/,/g, "."));
    settisModalVisible(true);
    dispatch(getTenantsDetails(e.orgCode));
  };
  const editOrg = (e) => {
    history.push(`${EDITORG}/${e.orgCode}`);
  };

  const handleStatus = (e) => {
    const payload = {
      status: "Disabled"
    };
    dispatch(changeTenantsStatus(payload, e.orgCode));
  };

  const handleCancel = () => {
    settisModalVisible(false);
    settDetails({});
    settUsers([]);
    settLogo("");
  };

  const handleSearch = (e) => {
    setpage(1);
    const params = `searchQuery=${e}`;
    dispatch(getTenants(params));
  };

  const handleReactive = (e) => {
    const payload = {
      orgId: e.orgCode
    };
    dispatch(reActivate(payload));
  };
  const handleOnChange = (pagination, filters, sorter) => {
    if (sorter.columnKey) {
      const params =
      `limit=${pagination.pageSize}&pageNumber=${pagination.current}`;
      const direction = sorter.order === "descend" ? "dsc" : "asc";
      const payload = params +
      `&sort=${sorter.columnKey}&sortDirection=${direction}`;
      dispatch(getTenants(payload));
    } else {
      const params =
      `limit=${pagination.pageSize}&pageNumber=${pagination.current}`;
      dispatch(getTenants(params));
    }
  };
  const {
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    country
  } = tDetails;

  return (
    <Spin
      spinning={
        tenantsResponse.fetching ||
        tenantsDetailsResponse.fetching ||
        tenantsStatusResponse.fetching
      }
      className="loader"
      size="large"
    >
      <div className="form-area">
      {(
        !tenantsResponse.fetching &&
        !tenantsDetailsResponse.fetching &&
        !tenantsStatusResponse.fetching
      )
        ? <Modal
            title={VIEWORG}
            visible={isModalVisible}
            width="80%"
            footer={null}
            className="antModal"
            onCancel={handleCancel}
            maskClosable = {false}
            mask={true}
          >
        <div className="modalBody">
          <h2>{tDetails ? tDetails.orgName : null }</h2>
          <Divider />
          <Row className="row">
            <Col xs={24} sm={24} md={6} lg={7} xl={7}>
              {tDetails
                ? <>
                <div className="title"><h4>{DETAILS}</h4></div>
                <div className="data">
                  <p>{CODE} {tDetails ? tDetails.orgCode : null }</p>
                  <p>{tDetails.cinNumber
                    ? `${CIN} ${tDetails.cinNumber}`
                    : null }</p>
                  <p>{GSTIN} {tDetails ? tDetails.gstNumber : null }</p>
                  <p>
                    {DOMAIN} <a href={tDetails
                      ? "http://" + tDetails.orgDomain + "." + DomainName
                      : null }
                      target="_blank"
                      rel="noreferrer"
                      >
                      {tDetails
                        ? tDetails.orgDomain + "." + DomainName
                        : null }</a>
                  </p>
                  <p>{PHONE} {tDetails ? tDetails.phoneNumber : null }</p>
                </div>
                <div className="subtitle"><h4>{ADDRESS}</h4></div>
                <div className="data">
                  <p>
                    {addressLine1 ? `${addressLine1},` : null}
                    {addressLine2 ? `${addressLine2},` : null}
                    {city ? `${city},` : null}
                    {state ? `${state},` : null}
                    {pincode ? `${pincode},` : null}
                    {country ? `${country}` : null}
                  </p>
                </div>
                </>
                : null }
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} xl={1} />
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <div className="title"><h4>{USERS}</h4></div>
              {tUsers && tUsers.length > 0 && typeof tUsers !== "string"
                ? tUsers.map(data =>
                  (
                    <div className="orgData" key={data.name}>
                      <p>{data.name}</p>
                      <p>
                        <a href={`mailto:${data.email}`}>{data.email}</a>
                      </p>
                      <p>{data.phoneNumber}</p>
                      <p className="tag">{data.roleName}</p>
                    </div>
                  ))
                : null}
            </Col>
            <Col xs={0} sm={0} md={1} lg={1} xl={1} />
            <Col xs={24} sm={24} md={6} lg={8} xl={8}>
              <div className="title"><h4>{LOGO}</h4></div>
              <div className="ogoArea">
                <img src={Logo || noImage} className="orgLogo" alt="No Logo" />
              </div>
            </Col>
          </Row>
        </div>
        </Modal>
        : null }
      <Row className="headerCol">
        <Col xs={24} sm={24} md={12} lg={5} xl={5} className="headerTitle">
          <h2>{VIEWORG}</h2>
        </Col>
        <Col xs={0} sm={0} md={1} lg={1} xl={1}>
          <span className="dividerBorder">|</span></Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="searchrow">
          <Search placeholder="Search"
          onSearch={handleSearch} enterButton
          allowClear={true} className="searchBox"/>
        </Col>
        <Col span={12}>
        </Col>
      </Row>
      <Divider className="divider"/>
      <div className="view-container-root">
        <Table
          columns={orgColumns(showModal, handleStatus, editOrg, handleReactive)}
          dataSource={tData}
          className="tableView"
          pagination= {{
            defaultCurrent: page,
            defaultPageSize: pageSize,
            total: count
          }}
          rowClassName={record =>
            (record.status === "Disabled" ? "deactivate" : null)
          }
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
