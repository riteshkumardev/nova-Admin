import firebase from "./firebaseConfig";
const storage = firebase.storage();

const storageRef = storage.ref();

export const upLoadResourceFile = (file, path) => {
  const fileRef = storageRef.child(path);
  return fileRef.put(file);
};

export const listFolders = async (path) => {
  let ref = storageRef.child(path);
  let folders = [];
  let files = [];
  try {
    let res = await ref.listAll();
    res.prefixes.forEach((folder) => {
      folders.push(folder.name);
    });
    res.items.forEach((file) => {
      files.push(file.name);
    });
    return { folders, files };
  } catch (error) {}
};

//  function to download file from firebase storage

export const downloadFile = async (path) => {
  let ref = storageRef.child(path);
  try {
    let res = await ref.getDownloadURL();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (path) => {
  let ref = storageRef.child(path);
  try {
    let res = await ref.delete();
    return res;
  } catch (error) {
    console.log(error);
  }
};

//  fuction to create folder in firebase storage

export const createFolder = async (path) => {
  let ref = storageRef.child(path);
  try {
    let res = await ref.create();
    return res;
  } catch (error) {
    console.log(error);
  }
};
