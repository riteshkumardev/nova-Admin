import React from "react";
import "./floatingActionButton.css";
import { Tooltip } from "antd";

const FloatingActionButton = ({ tooltip, onClick }) => {
  return (
    <Tooltip title={tooltip}>
      <div className="floatingbutton">
        <a onClick={onClick}></a>
      </div>
    </Tooltip>
  );
};

export default FloatingActionButton;
