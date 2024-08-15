// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTo2WxZ9ykEwlevd4LzjiZbza7tYFgMIE",
  authDomain: "financely-51abb.firebaseapp.com",
  projectId: "financely-51abb",
  storageBucket: "financely-51abb.appspot.com",
  messagingSenderId: "79419559707",
  appId: "1:79419559707:web:090ae35988430b315c4dbe",
  measurementId: "G-3GSTR0YRB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };