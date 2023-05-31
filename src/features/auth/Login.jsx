import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailPassword,
  socialLogin,
} from "../../app/firebase/authService";
import LoginUi from "./ui/LoginUi";

function Login() {
  const navigate = useNavigate();

  const onLoginWithEmailPassword = (values) => {
    signInWithEmailPassword(values)
      .then((loginInfo) => {
        navigate("/home", { replace: true });
      })
      .catch((err) => message.error(err.message));
  };

  const onAuthProviderLogin = (provider) => {
    socialLogin(provider).catch((err) => message.error(err.message));
  };

  return (
    <LoginUi
      onAuthProviderLogin={onAuthProviderLogin}
      onLoginWithEmailPassword={onLoginWithEmailPassword}
      onForgotPassword={() => {
        navigate("/resetPassword");
      }}
      onRegister={() => {
        navigate("/registration/register");
      }}
    />
  );
}

export default Login;
