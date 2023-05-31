import React from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import { AiOutlineGoogle } from "react-icons/ai";
import AuthHeader from "./AuthHeader";

const LoginUi = ({
  onLoginWithEmailPassword,
  onAuthProviderLogin,
  onRegister,
  onForgotPassword,
}) => {
  return (
    <>
      <div id="main-wrapper" class="oxyy-login-register bg-dark">
        <div className="container">
          <div className="row g-0 min-vh-100 py-4 py-md-5">
            <AuthHeader
              bgimg={
                "https://www.ravensbourne.ac.uk/sites/default/files/2021-04/Computer%20Science_0.jpeg"
              }
              head={"Welcome !"}
              sub={"Lets get started"}
            />
            <div className="col-lg-5 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div className="container my-auto py-5">
                <div className="row">
                  <div className="col-11 col-lg-10 mx-auto">
                    <h3 className="text-white text-center mb-4">Sign In</h3>
                    <Form
                      name="login"
                      initialValues={{
                        remember: true,
                      }}
                      labelCol={{ span: 7 }}
                      onFinish={onLoginWithEmailPassword}
                      classNameName="form-dark"
                    >
                      <div className="mb-3">
                        <label
                          className="form-label text-light"
                          for="emailAddress"
                        >
                          Email Address
                        </label>
                        <Form.Item
                          name="email"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please input your Email!",
                            },
                            {
                              type: "email",
                            },
                          ]}
                        >
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <label
                          className="form-label text-light"
                          for="loginPassword"
                        >
                          Password
                        </label>
                        <Form.Item
                          name="password"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please input your Password!",
                            },
                            {
                              min: 5,
                              message: "Min 5 characters required",
                            },
                          ]}
                        >
                          <input
                            className="form-control"
                            type="password"
                            placeholder="Enter Password"
                          />
                        </Form.Item>
                      </div>
                      <div className="row mt-4">
                        <div className="col">
                          <div className="form-check text-2">
                            <input
                              id="remember-me"
                              name="remember"
                              className="form-check-input"
                              type="checkbox"
                            />
                            <label
                              className="form-check-label text-light"
                              for="remember-me"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div
                          className="col-sm text-2 text-end"
                          onClick={onForgotPassword}
                        >
                          <a>Forgot Password ?</a>
                        </div>
                      </div>
                      <div className="d-grid my-4">
                        <Form.Item>
                          <button className="btn btn-primary" htmlType="submit">
                            Sign In
                          </button>
                        </Form.Item>
                      </div>
                    </Form>
                    <div className="d-flex align-items-center my-3">
                      <hr className="flex-grow-1 bg-dark-4" />
                      <span className="mx-2 text-2 text-muted">
                        Or with Social Profile
                      </span>
                      <hr className="flex-grow-1 bg-dark-4" />
                    </div>
                    <div className="d-flex flex-column align-items-center mb-4">
                      <ul className="social-icons social-icons-circle">
                        <li className="social-icons-facebook">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Facebook"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li className="social-icons-twitter">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Twitter"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li
                          className="social-icons-google"
                          onClick={() => onAuthProviderLogin("google")}
                        >
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Google"
                          >
                            <AiOutlineGoogle />
                          </a>
                        </li>
                        <li className="social-icons-linkedin">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Linkedin"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p
                      className="text-2 text-center text-light mb-0"
                      onClick={onRegister}
                    >
                      Don't have an account?
                      <a>Sign Up</a>
                    </p>
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

LoginUi.propTypes = {
  onLoginWithEmailPassword: PropTypes.func.isRequired,
  onAuthProviderLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
};

export default LoginUi;
