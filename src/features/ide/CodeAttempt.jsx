import { Card } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { myCodeTestDocListener } from "../../app/firebase/firestore/codingCollection";
import useDocListener from "../../app/hooks/useDocListener";

import CodeEditor from "./CodeEditor";
import { getCurrentTask, myCodingTaskesLoaded } from "./codeTasksSlice";

const CodeAttempt = ({ getCurrentTask, myCodingTaskesLoaded }) => {
  const { id } = useParams();

  useDocListener({
    query: () => myCodeTestDocListener(id),
    data: (codingTasks) => myCodingTaskesLoaded([codingTasks]),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: !getCurrentTask(id),
  });
  const currentTask = getCurrentTask(id);
  const testCases = currentTask?.testCases;
  return (
    <>
      <Card style={{ margin: "10px" }}>
        <pre>{currentTask?.description.replace(/\\n/g, "\n")}</pre>
      </Card>
      <CodeEditor testCases={testCases} />
    </>
  );
};

const mapStateToProps = (state) => ({
  getCurrentTask: (id) => getCurrentTask(id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  myCodingTaskesLoaded: (codingTasks) =>
    dispatch(myCodingTaskesLoaded(codingTasks)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CodeAttempt);
