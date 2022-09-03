import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { config } from "./firebase-config";

const app = firebase.initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
export const GoogleProvider = new GoogleAuthProvider();
export const GithubProvider = new GithubAuthProvider();
export const firestoreDB = getFirestore();
