import React from "react";

import { ReactComponent as NoConnectionSVG } from "../../assets/images/No-connection-bro.svg";

const NoConnection = () => {
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: "100px",
      }}
    >
      <NoConnectionSVG />
    </div>
  );
};

export default NoConnection;
