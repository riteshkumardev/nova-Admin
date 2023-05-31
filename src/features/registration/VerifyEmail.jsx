import { message } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import { sendEmailVerification } from "../../app/firebase/authService";
import AuthHeader from "../auth/ui/AuthHeader";
import { selectEmail } from "./../auth/authSlice";
import ReistrationSteps from "./ReistrationSteps";

function VerifyEmail({ email }) {
  const sendMail = async () => {
    try {
      sendEmailVerification();
      message.info("A verification email is sent!!");
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    sendMail();
  }, [email]);
  return (
    <>
      <div id="main-wrapper" class="oxyy-login-register bg-dark">
        <div class="container">
          <div class="row g-0 min-vh-100 py-4 py-md-5">
            <ReistrationSteps currentStep={1} />

            <AuthHeader
              bgimg={
                "https://tlr.stripocdn.email/content/guids/CABINET_2663efe83689b9bda1312f85374f56d2/images/10381620386430630.png"
              }
              sub={"Verify your email to finish signing up"}
            />

            <div class="col-lg-5 shadow-lg d-flex align-items-center rounded-3 rounded-start-0 bg-dark">
              <div class="container my-auto py-5">
                <div class="row">
                  <div class="col-11 col-lg-10 mx-auto">
                    <h3 class="text-white text-center mb-4">
                      Thank you for choosing NOVA.
                    </h3>
                    <p class="text-muted text-center mb-4">
                      Please confirm that {email} is your email address by
                      clicking on the button within 48 hours.
                    </p>
                    <div class="d-grid my-4">
                      <button
                        class="btn btn-primary"
                        onClick={() => window.location.reload()}
                      >
                        Next
                      </button>
                    </div>
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

const mapStateToProps = (state) => ({
  email: selectEmail(state),
});

export default connect(mapStateToProps)(VerifyEmail);
