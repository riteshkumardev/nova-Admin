import db from "../firestoreService";
import firebase from "../firebaseConfig";
import { message } from "antd";

export const startOnlineClass = (
  { classData, classUrl, description },
  { displayName, photoURL, uid }
) => {
  try {
    classData.forEach((cls) => {
      let collRef = db.collection("online classes");

      collRef.add({
        teacherId: uid,
        year: cls.year,
        branch: cls.branch,
        subject: cls.subject,
        startTime: firebase.firestore.Timestamp.fromDate(new Date()),
        section: cls.section,
        teacher: displayName,
        teacherPhoto: photoURL,
        description,
        classUrl,
      });
    });
    message.success("Started Class Successfully");
  } catch (error) {
    message.error(error.message);
    console.log(error);
  }
};

export const myClassesListener = (uid) => {
  return db.collection("online classes").where("teacherId", "==", uid);
};

export const stopOnlineClass = async (id) => {
  const querySnapshot = await db.collection("online classes").doc(id).delete();
  return querySnapshot;
};
