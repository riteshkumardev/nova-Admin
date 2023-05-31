import db from "../firestoreService";
import firebase from "../firebaseConfig";

export const myCodingTestListener = (uid) => {
  return db.collection("coding tests").where("teacherId", "==", uid);
};

export const myCodeTestDocListener = (id) => {
  return db.collection("coding tests").doc(id);
};

export const startCodingTest = async (id) => {
  try {
    let docref = await db
      .collection("coding tests")
      .doc(id)
      .update({ isStarted: true });
    return docref;
  } catch (error) {
    throw error.message;
  }
};

export const stopCodingTest = async (id) => {
  try {
    let docref = await db
      .collection("coding tests")
      .doc(id)
      .update({ isStarted: false });
    return docref;
  } catch (error) {
    throw error.message;
  }
};

export const addNewCodingTest = (
  { classData, testCases, description, title },
  { displayName, photoURL, uid }
) => {
  try {
    classData.forEach((cls) => {
      let collRef = db.collection("coding tests");

      collRef.add({
        teacherId: uid,
        year: cls.year,
        branch: cls.branch,
        subject: cls.subject,
        teacherPhoto: photoURL,
        startTime: firebase.firestore.Timestamp.fromDate(new Date()),
        section: cls.section,
        teacher: displayName,
        description,
        title,
        testCases,
      });
    });
  } catch (error) {
    throw error.message;
  }
};

export const deleteCodingTest = async (id) => {
  try {
    let docref = await db.collection("coding tests").doc(id).delete();
    return docref;
  } catch (error) {
    throw error.message;
  }
};

export const listenToCodingTestProgress = (id) => {
  return db.collection("coding tests").doc(id).collection("progress");
};
