import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { CloseCircleFilled } from "@ant-design/icons";
import messages from "../../constants/messages";
import "antd/dist/antd.css";
import "./OrgError.scss";

const {
  ORG_ERROR,
  ORG_ERROR_DESC
} = messages;

const OrgError = ({ history }) => {
  return (
    <div className="activate-account-right-area">
      <div className="login-form-area">
      <CloseCircleFilled className="error"/>
        <h2>{ORG_ERROR}</h2>
        <p>{ORG_ERROR_DESC}</p>
      </div>
    </div>
  );
};

OrgError.propTypes = {
  history: PropTypes.object
};

export default React.memo(withRouter(OrgError));
