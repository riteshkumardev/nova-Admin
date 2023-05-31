import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

import { authStateListener } from "../../app/firebase/authService";

const initialState = {
  currentUser: {
    email: null,
    photoURL: null,
    uid: null,
    displayName: null,
    providerId: null,
    creationTime: null,
    lastSignInTime: null,
    emailVerified: null,
  },
  isAuthenticated: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (auth) => {
      auth.currentUser = initialState.currentUser;
      auth.isAuthenticated = false;
    },
    login: (auth, action) => {
      auth.isAuthenticated = true;
      auth.currentUser = {
        email: action.payload.email,
        photoURL: action.payload.photoURL,
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        providerId: action.payload.providerId,
        creationTime: action.payload.creationTime || null,
        lastSignInTime: action.payload.lastSignInTime || null,
        emailVerified: action.payload.emailVerified,
      };
    },
    verifyUserEmail: (auth) => {
      auth.currentUser.emailVerified = true;
    },
  },
});

export function verifyAuth() {
  return function (dispatch) {
    authStateListener((userInfo) => {
      if (userInfo) {
        dispatch(
          login({
            ...userInfo.providerData[0],
            uid: userInfo.uid,
            creationTime: userInfo.metadata.creationTime,
            lastSignInTime: userInfo.metadata.lastSignInTime,
            emailVerified: userInfo.emailVerified,
          })
        );
        message.success("Logged in");
      } else {
        dispatch(logout());
        message.success("Logged out");
      }
    });
  };
}

export const { logout, login, verifyUserEmail } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAutheticated = (state) => state.auth.isAuthenticated;
export const selectEmailVerified = (state) =>
  state.auth.currentUser.emailVerified;

export const selectUid = (state) => state.auth.currentUser.uid;

export const selectDisplayName = (state) => state.auth.currentUser.displayName;
export const selectEmail = (state) => state.auth.currentUser.email;

export const selectCurrentUser = (store) => store.auth.currentUser;
