import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FloatingActionButton from "../../app/common/FloatingActionButton";
import { myCodingTestListener } from "../../app/firebase/firestore/codingCollection";
import useFirestoreCollection from "../../app/hooks/useCollectionListener";
import { selectProfileData } from "../Profile/profileSlice";
import {
  myCodingTaskesLoaded,
  selectCurrentCodingTasks,
} from "./codeTasksSlice";
import CodeTestsGrid from "./CodeTestsGrid";

const CodingTasks = ({
  teacherProfile,
  myCodingTaskesLoaded,
  hasCodingTasks,
}) => {
  useFirestoreCollection({
    query: () => myCodingTestListener(teacherProfile.uid),
    data: (codingTasks) => myCodingTaskesLoaded(codingTasks),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: true,
  });

  return (
    <div>
      <CodeTestsGrid />
      <Link to="/home/test/new">
        <FloatingActionButton tooltip="Start new coding test" />
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    teacherProfile: selectProfileData(state),
    hasCodingTasks: selectCurrentCodingTasks(state).length != 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    myCodingTaskesLoaded: (codingTasks) =>
      dispatch(myCodingTaskesLoaded(codingTasks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodingTasks);
