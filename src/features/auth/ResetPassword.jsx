import { Form, message } from "antd";
import React from "react";

import { sendPasswordReset } from "../../app/firebase/authService";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "./ui/AuthHeader";

function ResetPassword() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await sendPasswordReset(values.email);
      message.success("Password reset email sent!");
      navigate("/login");
    } catch (err) {
      message.error(err.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div id="main-wrapper" class="oxyy-login-register bg-dark">
        <div class="container">
          <div class="row g-0 min-vh-100 py-4 py-md-5">
            <AuthHeader
              bgimg={
                "https://media.istockphoto.com/photos/login-and-password-cyber-security-concept-data-protection-and-secured-picture-id1271787791?b=1&k=20&m=1271787791&s=170667a&w=0&h=riIFl9T6XhZgLYlSoTLdvvFf0JQpnmsoFyUW82MRP9c="
              }
              head={"Don't worry,"}
              sub={" We are here help you to recover your password."}
            />

            <div class="col-lg-5 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div class="container my-auto py-5">
                <div class="row">
                  <div class="col-11 col-lg-10 mx-auto">
                    <h3 class="text-white text-center mb-4">
                      Forgot password?
                    </h3>
                    <p class="text-muted text-center mb-4">
                      Enter the email address you used when you joined and we
                      will send you a link to reset your password.
                    </p>
                    <Form
                      name="normal_login"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      className="form-dark"
                    >
                      <div class="mb-3">
                        <label class="form-label text-light" for="emailAddress">
                          Email address
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
                            type="text"
                            class="form-control"
                            id="emailAddress"
                            required=""
                            placeholder="Enter Email"
                          />
                        </Form.Item>
                      </div>

                      <div class="d-grid my-4">
                        <Form.Item>
                          <button class="btn btn-primary" htmlType="submit">
                            Continue
                          </button>
                        </Form.Item>
                      </div>
                    </Form>
                    <div class="d-flex align-items-center my-3">
                      <hr class="flex-grow-1 bg-dark-4" />
                      <span class="mx-2 text-2 text-muted">
                        Or Sign In with Social
                      </span>
                      <hr class="flex-grow-1 bg-dark-4" />
                    </div>
                    <div class="d-flex flex-column align-items-center mb-4">
                      <ul class="social-icons social-icons-circle">
                        <li class="social-icons-facebook">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Facebook"
                          >
                            <i class="fab fa-facebook-f"></i>
                          </a>
                        </li>
                        <li class="social-icons-twitter">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Twitter"
                          >
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                        <li class="social-icons-google">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Google"
                          >
                            <i class="fab fa-google"></i>
                          </a>
                        </li>
                        <li class="social-icons-linkedin">
                          <a
                            href="#"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="Log In with Linkedin"
                          >
                            <i class="fab fa-linkedin-in"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p class="text-2 text-center text-light mb-0">
                      Return to
                      <Link to={"/login"}>Sign In</Link>
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
}

export default ResetPassword;
