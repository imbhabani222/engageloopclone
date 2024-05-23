import React from "react";
import { withRouter } from "react-router-dom";
import Cookies from "../../constants/cookiesMessages";

import {
  Divider
} from "antd";

const CookiePreferences = () => {
  return (
    <>
        <Divider className="divider" />
        <Cookies />
    </>
  );
};

export default React.memo(withRouter(CookiePreferences));
