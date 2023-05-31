import React from "react";
import useFirestoreCollection from "../../app/hooks/useCollectionListener";
import { listenToCodingTestProgress } from "../../app/firebase/firestore/codingCollection";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { progressLoaded, selectProgress } from "./codeTasksSlice";
import { Image, Table } from "antd";
import CodeEditor from "./CodeEditor";

const TestProgress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useFirestoreCollection({
    query: () => listenToCodingTestProgress(id),
    data: (progress) => dispatch(progressLoaded(progress)),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: true,
  });
  const progress = useSelector(selectProgress);
  const columns = [
    {
      title: "Pic",
      dataIndex: "photoURL",
      key: "photoURL",
      render: (url) => <Image width={40} height={40} src={url} />,
    },
    {
      title: "Name",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Roll",
      dataIndex: "rollno",
      key: "rollno",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
      defaultSortOrder: "descend",
    },
    {
      title: "Lang",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Sec",
      dataIndex: "section",
      key: "section",
    },
  ];
  return (
    <>
      <h1>Leaderboard</h1>
      <Table
        rowKey="rollno"
        columns={columns}
        dataSource={progress}
        pagination={{ defaultPageSize: 50 }}
        expandable={{
          expandedRowRender: (record) => (
            <CodeEditor
              script={record.codeSubmitted}
              lang={record.language}
              langMode={record.languageMode}
            />
          ),
        }}
      />
    </>
  );
};

export default TestProgress;
