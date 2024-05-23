/* eslint-disable max-len */
import React from "react";
import { withRouter } from "react-router-dom";
import Terms from "../../constants/termsMessages";

import {
  Divider
} from "antd";

const termsConditions = () => {
  return (
    <>
        <div className="page-title">
            <h2>TERMS OF SERVICE</h2>
        </div>
        <Divider className="divider" />
        <Terms />
     </>
  );
};

export default React.memo(withRouter(termsConditions));
