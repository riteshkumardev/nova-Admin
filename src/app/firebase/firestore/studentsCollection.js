import db from "../firestoreService";

export const studentProfileConverter = {
  toFirestore: function (studentProfile) {
    studentProfile.rollno = studentProfile.rollno.toLowerCase();
    studentProfile.section = studentProfile.section.toUpperCase();
    const attendance = `/attendance/${studentProfile.uid}`;
    return {
      ...studentProfile,
      attendance,
    };
  },
  fromFirestore: function (snapshot, options) {
    const studentProfile = snapshot.data(options);
    const date = new Date();
    const year = date.getFullYear();
    const from_year = studentProfile.from_year;
    return {
      ...studentProfile,
      academic_year: year - from_year,
    };
  },
};

export function setStudentProfileData(student) {
  return db
    .collection("students")
    .doc(student.uid)
    .withConverter(studentProfileConverter)
    .set(student, { merge: true });
}
