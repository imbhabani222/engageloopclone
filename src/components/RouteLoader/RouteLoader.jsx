import React from "react";
import PropTypes from "prop-types";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const RouteLoader = ({ style }) => {
  return (
    <div style={style}>
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 40 }} spin />
        }
      />
    </div>
  );
};

RouteLoader.propTypes = {
  style: PropTypes.object
};

RouteLoader.defaultProps = {
  style: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default React.memo(RouteLoader);
