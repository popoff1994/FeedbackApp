import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAtw0eyqDyAILqlrB6r4m5NyvSwwnORcs",
  authDomain: "feedbackapp-d6e53.firebaseapp.com",
  projectId: "feedbackapp-d6e53",
  storageBucket: "feedbackapp-d6e53.appspot.com",
  messagingSenderId: "311009319795",
  appId: "1:311009319795:web:f294a0ca68adb88812c306",
  measurementId: "G-41LYTYFKK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);