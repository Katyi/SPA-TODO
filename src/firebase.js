// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBL53LBdVoTtD1qZ61Si0fYJ6mIWXiTcg",
  authDomain: "spa-todo-15176.firebaseapp.com",
  databaseURL: "https://spa-todo-15176-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spa-todo-15176",
  storageBucket: "spa-todo-15176.appspot.com",
  messagingSenderId: "223528433449",
  appId: "1:223528433449:web:6138640e5eb03ef057e938"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 