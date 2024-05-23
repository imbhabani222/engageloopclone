/* eslint-disable max-len */
import React from "react";
import { withRouter } from "react-router-dom";
import Privacy from "../../constants/privacyMessage";

import {
  Divider
} from "antd";

const PrivacyPolicy = () => {
  return (
    <>
        <Divider className="divider" />
        <Privacy />
    </>
  );
};

export default React.memo(withRouter(PrivacyPolicy));
