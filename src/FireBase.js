// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrPct15A4up4rs12H4-K8eu4LbDP8Sn50",
  authDomain: "dogs-4090b.firebaseapp.com",
  projectId: "dogs-4090b",
  storageBucket: "dogs-4090b.appspot.com",
  messagingSenderId: "1062184675282",
  appId: "1:1062184675282:web:cad103e2c2acb5821eca0b",
  measurementId: "G-HJWW4X2WHN",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
