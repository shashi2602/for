import { firestoreDB } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const userRef = collection(firestoreDB, "users");

function WriteUser(user) {
  return addDoc(userRef, user);
}

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
export { WriteUser, userRef, getAllUsers, getUserDoc, updateUserDoc };
