import { Col, Row } from "antd";
import React from "react";
import { connect } from "react-redux";

import TaskCard from "./TaskCard";
import { selectCurrentCodingTasks } from "./codeTasksSlice";
import Nodata from "../../app/common/Nodata";

const CodeTestsGrid = ({ myCodingTasks }) => {
  return (
    <Row justify="center">
      {myCodingTasks.length === 0 && <Nodata />}
      {myCodingTasks.map((task, index) => (
        <Col xs={24} sm={24} md={12} lg={12} xl={8}>
          <TaskCard taskData={task} index={index} />
        </Col>
      ))}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    myCodingTasks: selectCurrentCodingTasks(state),
  };
};

export default connect(mapStateToProps)(CodeTestsGrid);
