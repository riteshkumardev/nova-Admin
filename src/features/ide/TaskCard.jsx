import React from "react";
import { Button, Card, message } from "antd";
import { Link } from "react-router-dom";
import {
  deleteCodingTest,
  startCodingTest,
  stopCodingTest,
} from "../../app/firebase/firestore/codingCollection";

const TaskCard = ({ taskData, index }) => {
  const { title, teacherPhoto, isStarted, subject, section, teacher, id } =
    taskData;
  return (
    <Card
      hoverable
      key={index}
      style={{
        margin: "8px",
      }}
      cover={
        <img alt="example" style={{ objectFit: "cover" }} src={teacherPhoto} />
      }
      actions={[
        <Button
          disabled={!isStarted}
          onClick={() =>
            stopCodingTest(id)
              .then(message.warn("Code task Stopped"))
              .catch((err) => message.error(err))
          }
        >
          Stop
        </Button>,
        <Button
          disabled={isStarted}
          onClick={() =>
            startCodingTest(id)
              .then(message.success("Code task Started"))
              .catch((err) => message.error(err))
          }
        >
          {isStarted ? "Started" : "start"}
        </Button>,
        <Link to={`/home/test/attempt/${id}`}>
          <Button>Attempt</Button>
        </Link>,
        <Link to={`/home/test/progress/${id}`}>
          <Button>Progress</Button>
        </Link>,
        <Button
          onClick={() =>
            deleteCodingTest(id)
              .then(message.warn("Deleted from database"))
              .catch((err) => message.error(err))
          }
        >
          Del
        </Button>,
      ]}
    >
      <Card.Meta title={title} description={`${subject} (${section})`} />
      <pre>
        <br />
        {`  -- ${teacher}`}
      </pre>
    </Card>
  );
};

export default TaskCard;
