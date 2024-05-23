import React, { useMemo } from "react";
import { Space, Popconfirm, Tooltip } from "antd";
import constants from "../../../constants/constants";
import Icon from "@ant-design/icons";
import { ReactComponent as ActivateIcon }
  from "../../../assets/img/table/activate.svg";
import { ReactComponent as RefreshIcon }
  from "../../../assets/img/table/refresh.svg";
import { ReactComponent as DisabledIcon }
  from "../../../assets/img/table/disabled-fill.svg";
import { ReactComponent as EditIcon }
  from "../../../assets/img/table/edit.svg";
import { ReactComponent as ViewIcon }
  from "../../../assets/img/table/view.svg";
import { ReactComponent as PendingIcon }
  from "../../../assets/img/table/pending.svg";
import { isNull, isBlank } from "../../../utils";
const {
  ACTIVATE,
  DEACTIVATE,
  PENDING,
  REACTIVATE,
  DISABLE_MESSAGE
} = constants;

const actions = (record, showModal, handleStatus, editOrg) => {
  const statusDisable = useMemo(() => {
    return record.status === "Pending" || record.status === "Disabled"
      ? "Disabled"
      : null;
  }, [record.status]);
  const pendingstatusDisable = useMemo(() => {
    return record.status === "Disabled"
      ? "Disabled"
      : null;
  }, [record.status]);
  return <Space className="action-icon">
    <Tooltip placement="bottom" title="View">
      <a className={pendingstatusDisable}
        onClick={() => showModal(record)}
      >
        <Icon component={ViewIcon} className="icons"/>
      </a>
    </Tooltip>
    <Tooltip placement="bottom" title="Edit">
      <a className={statusDisable} onClick={() => editOrg(record)}>
        <Icon component={EditIcon} className="icons"/>
      </a>
    </Tooltip>
    <Tooltip placement="bottom" title="Disable">
      <Popconfirm
        title={DISABLE_MESSAGE}
        onConfirm={() => handleStatus(record)}
        okText="Yes" cancelText="No"
        placement="topRight"
      >
        <a className={statusDisable}>
        <Icon component={DisabledIcon} className="icons"/>
        </a>
      </Popconfirm>
    </Tooltip>
  </Space>;
};
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

const address = (text, record) => {
  return <span>
    {isNull(record.addressLine1)}
    {isNull(record.addressLine2)}
    {isNull(record.city)}
    {isNull(record.state)}
    {isNull(record.pincode)}
    {isBlank(record.country)}
  </span>;
};

export const orgColumns = (
  showModal, handleStatus, editOrg, handleReactive) => [
  {
    title: "Name",
    dataIndex: "orgName",
    key: "orgName",
    width: "30%",
    className: "firstChild",
    sorter: true
  },
  {
    title: "Code",
    dataIndex: "orgCode",
    key: "orgCode",
    width: "15%",
    sorter: true
  },
  {
    title: "Address",
    dataIndex: "addressLine1",
    key: "addressLine1",
    width: "30%",
    render: (text, record) => address(text, record)
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "15%",
    sorter: true,
    render: (text, record) => status(text, record, handleReactive)
  },
  {
    title: "Action",
    key: "action",
    width: "10%",
    className: "rowHeader",
    render: (record) => actions(record, showModal, handleStatus, editOrg)
  }
];
