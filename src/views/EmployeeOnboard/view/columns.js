import React from "react";
import { Tooltip } from "antd";

import Icon from "@ant-design/icons";
import { ReactComponent as ActivateIcon }
  from "../../../assets/img/table/activate.svg";
import { ReactComponent as RefreshIcon }
  from "../../../assets/img/table/refresh.svg";
import { ReactComponent as DisabledIcon }
  from "../../../assets/img/table/disabled-fill.svg";
import { ReactComponent as PendingIcon }
  from "../../../assets/img/table/pending.svg";
import constants from "../../../constants/constants";

const {
  ACTIVATE,
  DEACTIVATE,
  PENDING,
  REACTIVATE
} = constants;

const status = (text, record, handleReactive) => {
  if (text === "Activated") {
    return <span>
      <Icon component={ActivateIcon} className="activateIcon"/> {ACTIVATE}
    </span>;
  }
  if (text === "Disabled") {
    return <span>
      <Icon component={DisabledIcon} className="deactivateIcon"/>
        {DEACTIVATE}</span>;
  }
  if (text === "Pending") {
    return <span>
      <Icon component={PendingIcon} className="pendingIcon"/>
      {PENDING}</span>;
  }
  if (text === "Reactivate") {
    return <a onClick={() => handleReactive(record)}>
      <Icon component={RefreshIcon} className="deactivateIcon"/>
      {REACTIVATE}</a>;
  }
};

const userData = (text, record) => {
  const data = (record.firstName ? record.firstName : "") + " " +
  (record.middleName
    ? record.middleName
    : "") + " " + (record.lastName ? record.lastName : "");
  return <Tooltip placement="top"
  title={data}>
      <span>
    {record.firstName} {record.middleName} {record.lastName}
    {record.name}</span>
    </Tooltip>;
};

const emailData = (text, record) => {
  return <Tooltip placement="top"
  title={record.email}>
    <a href={`mailto:${record.email}`}>
{record.email}
  </a></Tooltip>;
};

const manageemailData = (text, record) => {
  return <Tooltip placement="top"
  title={record.managerEmail}>
  <a href={`mailto:${record.managerEmail}`}>
{record.managerEmail}
  </a></Tooltip>;
};

export const columns = (handleReactive) => [
  {
    title: "User Name",
    dataIndex: "firstName",
    key: "firstName",
    className: "firstChild",
    width: "200px",
    sorter: true,
    ellipsis: true,
    render: (text, record) => userData(text, record)
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
    width: "200px",
    ellipsis: true,
    sorter: true,
    className: "linkClass",
    render: (text, record) => emailData(text, record)
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: "150px",
    sorter: true
  },
  {
    title: "Employee ID",
    dataIndex: "employeeId",
    key: "employeeId",
    width: "150px",
    sorter: true
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    width: "150px",
    sorter: true
  },
  {
    title: "Manager's Email Address",
    dataIndex: "managerEmail",
    key: "managerEmail",
    width: "280px",
    sorter: true,
    ellipsis: true,
    className: "linkClass",
    render: (text, record) => manageemailData(text, record)
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    fixed: "right",
    width: "120px",
    sorter: true,
    render: (text, record) => status(text, record, handleReactive)
  }
];
