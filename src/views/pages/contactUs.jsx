import React from "react";
import { withRouter } from "react-router-dom";
import ContactMessages from "../../constants/contactMessages";

import {
  Divider
} from "antd";

const ContactUs = () => {
  return (
    <>
        <Divider className="divider" />
        <ContactMessages />
    </>
  );
};

export default React.memo(withRouter(ContactUs));
