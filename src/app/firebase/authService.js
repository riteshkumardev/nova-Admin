import firebase from "./firebaseConfig";
import { deleteUserProfileData } from "./firestore/teachersCollection";

const auth = firebase.auth();

export function authStateListener(observer) {
  return auth.onAuthStateChanged(observer);
}

export function signOut() {
  return auth.signOut();
}

export function signInWithEmailPassword({ email, password }) {
  return auth.signInWithEmailAndPassword(email, password);
}

export async function signUpWithEmail(creds) {
  const result = await firebase
    .auth()
    .createUserWithEmailAndPassword(creds.email, creds.password);
  await result.user.updateProfile({
    displayName: creds.username,
  });
}

export function sendEmailVerification() {
  return auth.currentUser.sendEmailVerification({
    url: "http://localhost:7000/registration/profile",
  });
}

export function sendPasswordReset(email) {
  return auth.sendPasswordResetEmail(email);
}

export const getCurrentUserInfo = () => {
  return auth.currentUser;
};

//   Other auth providers

export function socialLogin(selectedProvider) {
  let provider;
  if (selectedProvider === "github") {
    provider = new firebase.auth.GithubAuthProvider();
  }
  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  return auth.signInWithPopup(provider);
}

export async function deleteUser() {
  const user = getCurrentUserInfo();
  const userId = user.uid;

  await user.delete();
  await deleteUserProfileData(userId);
}
