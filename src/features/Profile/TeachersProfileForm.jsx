import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Cascader, Form, message } from "antd";
import React from "react";
import { connect } from "react-redux";

import { setTeacherProfileData } from "../../app/firebase/firestore/teachersCollection";
import { classesOptions } from "../../app/subjectsApi";
import { selectCurrentUser } from "../auth/authSlice";

import "./TeachersProfileStyles.css";
import AuthHeader from "../auth/ui/AuthHeader";
import ReistrationSteps from "../registration/ReistrationSteps";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const TeachersProfile = ({ teacherAuthData }) => {
  const onFinish = async (val) => {
    try {
      await setTeacherProfileData({ ...val, ...teacherAuthData });
      message.success("Successfully Registered");
      window.location.reload();
    } catch (err) {
      message.error(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <div id="main-wrapper" class="oxyy-login-register bg-dark">
        <div className="container">
          <div className="row g-0 min-vh-100 py-4 py-md-5">
            <ReistrationSteps currentStep={2} />
            <AuthHeader
              bgimg={
                "https://static.wixstatic.com/media/11062b_4456ba5e63714bc79e2a51e9218fd0d1~mv2.jpg/v1/crop/x_14,y_0,w_4972,h_3333/fill/w_560,h_374,al_c,q_80,usm_0.66_1.00_0.01/Work%20Desk.webp"
              }
              head={"Your Profile"}
              sub={"Keep your profile up to date"}
            />
            <div className="col-lg-5 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div className="container my-auto py-5">
                <div className="row">
                  <div className="col-11 col-lg-10 mx-auto">
                    <h3 className="text-white text-center mb-4">
                      Teachers Profile Data
                    </h3>
                    <p class="text-muted text-center mb-4">
                      Enter the subjects you teach along with your phone number
                      and address.
                    </p>
                    <Form
                      name="dynamic_form_item"
                      {...formItemLayoutWithOutLabel}
                      onFinish={onFinish}
                      className="login-form"
                    >
                      <Form.List
                        name="classes"
                        rules={[
                          {
                            validator: async (_, classes) => {
                              if (!classes || classes.length < 1) {
                                return Promise.reject(
                                  new Error("At least 1 class")
                                );
                              }
                            },
                          },
                        ]}
                      >
                        {(fields, { add, remove }, { errors }) => (
                          <>
                            {fields.map((field, index) => (
                              <Form.Item
                                {...(index === 0
                                  ? formItemLayout
                                  : formItemLayoutWithOutLabel)}
                                label={
                                  index === 0 ? (
                                    <label className="form-label text-light">
                                      Classes
                                    </label>
                                  ) : (
                                    ""
                                  )
                                }
                                required={false}
                                key={field.key}
                              >
                                <Form.Item
                                  {...field}
                                  validateTrigger={["onChange", "onBlur"]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please input a class or delete this field.",
                                    },
                                  ]}
                                  noStyle
                                >
                                  <Cascader
                                    options={classesOptions}
                                    style={{ maxWidth: 300 }}
                                  />
                                </Form.Item>
                                {fields.length > 1 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                  />
                                ) : null}
                              </Form.Item>
                            ))}
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: "60%" }}
                                icon={<PlusOutlined />}
                              >
                                Add Subject
                              </Button>
                              <Form.ErrorList errors={errors} />
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                      <div className="mb-3">
                        <label className="form-label text-light">Phone</label>
                        <Form.Item
                          {...formItemLayout}
                          name="phone"
                          rules={[{ required: true }]}
                        >
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Phone Number"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-light">Address</label>
                        <Form.Item
                          name="address"
                          {...formItemLayout}
                          rules={[{ required: true }]}
                        >
                          <textarea
                            className="form-control"
                            type="text"
                            placeholder="Enter Address"
                          />
                        </Form.Item>
                      </div>
                      <div className="d-grid my-4">
                        <Form.Item>
                          <button className="btn btn-primary" htmlType="submit">
                            Submit
                          </button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  teacherAuthData: selectCurrentUser(state),
});

export default connect(mapStateToProps)(TeachersProfile);
