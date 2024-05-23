import React from "react";
import PropTypes from "prop-types";

import { Carousel } from "antd";

import "antd/dist/antd.css";
import "./styles.scss";

const Announcement = ({ dataList }) => {
  return (
    <Carousel className="announcementContainer">
      {
        dataList.length
          ? dataList.map(item => (
            <div key={item}>
              <h3>{item.value}</h3>
            </div>
          ))
          : null
      }
    </Carousel>
  );
};

Announcement.propTypes = {
  dataList: PropTypes.array
};

Announcement.defaultProps = {
  dataList: []
};

export default React.memo(Announcement);
