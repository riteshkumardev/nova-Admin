import db from "../firestoreService";
import firebase from "../firebaseConfig";

export const setTeacherProfileData = async ({
  photoURL,
  uid,
  displayName,
  classes, //[["cse",1,"B","sub"],[]]
  address,
  phone,
  email,
}) => {
  const teacherDoc = db.collection("teachers").doc(uid);
  const batch = db.batch();
  batch.set(teacherDoc, {
    classes: [],
  });
  console.log(classes);
  classes.forEach((classData) => {
    const branch = classData[0];
    const year = classData[1];
    const section = classData[2];
    const subject = classData[3];

    batch.update(teacherDoc, {
      classes: firebase.firestore.FieldValue.arrayUnion({
        branch,
        year,
        section,
        subject,
      }),
    });
  });
  batch.set(
    teacherDoc,
    { address, phone, photoURL, displayName, email, uid },
    { merge: true }
  );
  return batch.commit();
};

export const editProfileData = async ({ classes, phone, address, uid }) => {
  const teacherDoc = db.collection("teachers").doc(uid);
  const batch = db.batch();

  batch.update(teacherDoc, { classes: [] });

  classes.forEach((classData) => {
    const branch = classData[0];
    const year = classData[1];
    const section = classData[2];
    const subject = classData[3];
    batch.update(teacherDoc, {
      classes: firebase.firestore.FieldValue.arrayUnion({
        branch,
        year,
        section,
        subject,
      }),
    });
  });

  batch.update(teacherDoc, { address, phone }, { merge: true });
  return batch.commit();
};

export const getUserProfile = async (uid) => {
  const teacherProfileDoc = db.collection("teachers").doc(uid);
  try {
    let doc = await teacherProfileDoc.get();
    if (doc.exists) {
      return doc.data();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUserProfileData = async (uid) => {
  const teacherProfileDoc = db.collection("teachers").doc(uid);
  try {
    let doc = await teacherProfileDoc.get();
    if (doc.exists) {
      teacherProfileDoc.delete();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const listenToProfileData = async (uid) => {
  return db.collection("teachers").doc(uid);
};

export function profileDataListener(uid) {
  return db.collection("teachers").doc(uid);
}
