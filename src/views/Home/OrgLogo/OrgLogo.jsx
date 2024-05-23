import React from "react";

import {
  Spin
} from "antd";

import noImage from "../../../assets/img/noImage.png";
import messages from "../../../constants/messages";
import {
  getUserLogo
} from "../../../utils";

import "./styles.scss";

const {
  IMAGE_NOT_AVAILABLE
} = messages;

const OrgLogo = () => {
  const userLogo = getUserLogo();
  return (
    <div className="paperContainer">
      <div className="homeOrgLogoContainer">
        <Spin
          spinning={false}
          className="loader"
          size="large"
        />
        <img src={userLogo || noImage}
        alt={IMAGE_NOT_AVAILABLE} className="homeOrgLogo" />
      </div>
    </div>
  );
};

export default React.memo(OrgLogo);
