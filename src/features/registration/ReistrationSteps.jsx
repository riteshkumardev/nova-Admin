import { Col, Row, Steps } from "antd";
import PropTypes from "prop-types";
import React from "react";

function ReistrationSteps({ currentStep }) {
  return (
    <Row justify="space-around" style={{ margin: "20px 0 20px 0" }}>
      <Col xs={{ span: 22 }} md={{ span: 20 }} lg={{ span: 12 }}>
        <Steps current={currentStep}>
          <Steps.Step title={<p className="text-white">Register</p>} />
          <Steps.Step title={<p className="text-white">Verify</p>} />
          <Steps.Step title={<p className="text-white">Profile</p>} />
        </Steps>
      </Col>
    </Row>
  );
}

export default ReistrationSteps;

ReistrationSteps.propTypes = {
  currentStep: PropTypes.number,
};
