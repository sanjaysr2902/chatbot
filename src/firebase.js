import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_jME336yyYJND2AXSM93kMIQCvuQ9Pq0",
  authDomain: "sachusaaru.firebaseapp.com",
  projectId: "sachusaaru",
  storageBucket: "sachusaaru.firebasestorage.app",
  messagingSenderId: "33589168724",
  appId: "1:33589168724:web:44746dbc99a68e3e773bc1",
  measurementId: "G-K637RDPCHC"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);