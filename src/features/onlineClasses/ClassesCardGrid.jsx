import { Card, Col, message, Row } from "antd";
import { Button } from "antd/lib/radio";
import React from "react";
import { connect } from "react-redux";
import Nodata from "../../app/common/Nodata";
import { stopOnlineClass } from "../../app/firebase/firestore/classesCollection";
import { selectCurrentClasses } from "./classesSclice";

const ClassCardGrid = ({ currentClasses }) => {
  const { Meta } = Card;
  return (
    <>
      <Row justify="center">
        {currentClasses.length === 0 && <Nodata />}
        {currentClasses.map((cls, index) => {
          return (
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Card
                hoverable
                key={index}
                style={{
                  margin: "8px",
                }}
                cover={
                  <img
                    alt="example"
                    style={{ objectFit: "cover" }}
                    src={cls.teacherPhoto}
                  />
                }
                actions={[
                  <Button
                    onClick={() =>
                      stopOnlineClass(cls.id)
                        .then(message.warn("Class Stopped"))
                        .catch((err) => message.error(err.message))
                    }
                  >
                    Stop
                  </Button>,
                  <Button>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={cls.classUrl}
                    >
                      Join
                    </a>
                  </Button>,
                ]}
              >
                <Meta
                  title={`${cls.description}`}
                  description={`${cls.subject} (${cls.section})`}
                />
                <pre>
                  <br />
                  {`  -- ${cls.teacher}`}
                </pre>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentClasses: selectCurrentClasses(state),
  };
};

export default connect(mapStateToProps)(ClassCardGrid);
