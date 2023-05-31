import React, { useState } from "react";
import { Modal, Form, Input, Checkbox } from "antd";
import { connect } from "react-redux";
import { selectClasses, selectProfileData } from "../Profile/profileSlice";
import {
  myClassesListener,
  startOnlineClass,
} from "../../app/firebase/firestore/classesCollection";
import { myClassesLoaded, selectCurrentClasses } from "./classesSclice";
import ClassCardGrid from "./ClassesCardGrid";
import FloatingActionButton from "../../app/common/FloatingActionButton";
import useCollectionListener from "../../app/hooks/useCollectionListener";

const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  classes,
  currentClasses,
}) => {
  const [form] = Form.useForm();
  currentClasses = currentClasses.map((cls) => {
    let { subject, branch, section, year } = cls;
    return `${subject}${branch}${section}${year}`;
  });
  let options = classes.map((cls, index) => {
    return {
      label: `${cls.subject} (${cls.section})`,
      value: cls,
      key: index,
      disabled: currentClasses.includes(
        `${cls.subject}${cls.branch}${cls.section}${cls.year}`
      ),
    };
  });
  return (
    <Modal
      visible={visible}
      title="Create a new class"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="classUrl"
          label="Class Room Url Invitation Link"
          rules={[
            {
              required: true,
              message: "Please input the invitation link",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Class Description"
          rules={[
            {
              required: true,
              message: "Please input the description",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="classData"
          rules={[{ required: true, message: "Select atleast one class" }]}
        >
          <Checkbox.Group options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const OnlineClasses = ({
  classes,
  currentClasses,
  myClassesLoaded,
  teacherProfile,
}) => {
  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    startOnlineClass(values, teacherProfile);
    setVisible(false);
  };

  useCollectionListener({
    query: () => myClassesListener(teacherProfile.uid),
    data: (myClasses) => myClassesLoaded(myClasses),
    deps: [],
    stopListener: true,
    shouldExecuteQuery: true,
  });

  return (
    <div>
      <ClassCardGrid />

      <FloatingActionButton
        onClick={() => setVisible(true)}
        tooltip="Start new class"
      />
      <CollectionCreateForm
        currentClasses={currentClasses}
        classes={classes}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    classes: selectClasses(state),
    teacherProfile: selectProfileData(state),
    currentClasses: selectCurrentClasses(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    myClassesLoaded: (classes) => dispatch(myClassesLoaded(classes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineClasses);
