import { firestoreDB } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
const userRef = collection(firestoreDB, "users");
const usernamesRef = collection(firestoreDB, "usernames");

const addUsername = (username) => {
  return addDoc(usernamesRef, username);
};

const addUser = (user) => {
  const docRef = doc(firestoreDB, "users", user?.uid);
  setDoc(docRef, user, { merge: true });
};

function getAllUsers() {
  return getDocs(userRef);
}

function getUserDoc(id) {
  const userDoc = doc(firestoreDB, "users", id);
  return getDoc(userDoc);
}
function updateUserDoc(id, data) {
  const userDoc = doc(firestoreDB, "users", id);
  return updateDoc(userDoc, data);
}
export {
  addUser,
  userRef,
  getAllUsers,
  getUserDoc,
  updateUserDoc,
  addUsername,
};
