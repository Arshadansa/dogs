// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgZhA0a0CwsxjSyQmQMGLP57A262A2c90",
  authDomain: "bugs-3e2fb.firebaseapp.com",
  projectId: "bugs-3e2fb",
  storageBucket: "bugs-3e2fb.appspot.com",
  messagingSenderId: "929409749404",
  appId: "1:929409749404:web:1a2b1af542011e35a9b859",
  measurementId: "G-D1LPGBMJWB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
