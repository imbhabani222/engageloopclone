import React from "react";
import PropTypes from "prop-types";

import { Typography } from "antd";

import constants from "../../constants/constants";
import WelcomneImg from "../../assets/img/welcome.png";
import WelcomeSamllImg from "../../assets/img/Welcome-small.png";

import "./styles.scss";

const {
  GUEST_LABEL,
  WELCOME_LABEL
} = constants;
const { Text } = Typography;

const Welcome = ({ userName }) => {
  return (
    <div className="welcomeContainer">
      <Text className="welcomeMessage">{ WELCOME_LABEL }</Text>
      <Text className="welcomeUserName">{ userName }</Text>
      <img src={WelcomneImg} className="welcomeImage" />
      <img src={WelcomeSamllImg} className="welcomeSmallImage" />
    </div>
  );
};

Welcome.propTypes = {
  userName: PropTypes.string
};

Welcome.defaultProps = {
  userName: GUEST_LABEL
};

export default React.memo(Welcome);
