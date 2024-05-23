import React from "react";

import constants from "../../../constants/constants.js";

const Approval = () => {
  return (
    <div className="paperContainer">
      { constants.APPROVAL_LABEL }
    </div>
  );
};

export default React.memo(Approval);
