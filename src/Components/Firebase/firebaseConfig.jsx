import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAH0g5ayeIunu8CIpJNWN90fQ8ZFo75qB8",
  authDomain: "project-5d61a.firebaseapp.com",
  databaseURL: "https://project-5d61a-default-rtdb.firebaseio.com",
  projectId: "project-5d61a",
  storageBucket: "project-5d61a.appspot.com",
  messagingSenderId: "62241191671",
  appId: "1:62241191671:web:f988b7ad4ffcdf221745f2",
  measurementId: "G-LH7QE7DRJM"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(FirebaseApp);
const db = getFirestore(FirebaseApp);
const storage =getStorage(FirebaseApp)
export { auth, db ,storage};

export default FirebaseApp;
