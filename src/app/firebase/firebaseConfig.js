import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5QPoMXkpbWf9cr-9IXPw-XuHuz_g3j5Q",
  authDomain: "chat-app-project-4b80f.firebaseapp.com",
  projectId: "chat-app-project-4b80f",
  storageBucket: "chat-app-project-4b80f.appspot.com",
  messagingSenderId: "9646833396",
  appId: "1:9646833396:web:be42f16546e613b20968a1",
  measurementId: "G-XZ4SCXF5JY",
};

firebase.initializeApp(firebaseConfig);

const useEmulator = true;

if (window.location.hostname === "localhost" && useEmulator) {
  firebase.functions().useEmulator("localhost", 5001);
  firebase
    .auth()
    .useEmulator("http://localhost:9099", { disableWarnings: true });
  firebase.firestore().useEmulator("localhost", 8080);
  firebase.storage().useEmulator("localhost", 9199);
}

export default firebase;
