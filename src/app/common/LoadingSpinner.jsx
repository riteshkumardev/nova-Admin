import React from "react";
import { Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <>
      <Spin
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      />
    </>
  );
};

export default LoadingSpinner;
