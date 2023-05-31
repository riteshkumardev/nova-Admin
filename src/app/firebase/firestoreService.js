import firebase from "./firebaseConfig";

const db = firebase.firestore();

export const dataFromSnapshot = (snapshot) => {
  const data = snapshot.data();
  data.id = snapshot.id;
  for (const prop in data) {
    if (data[prop] instanceof firebase.firestore.Timestamp) {
      data[prop] = Date(data[prop].toDate()).toString();
    }
  }
  return data;
};

export default db;
