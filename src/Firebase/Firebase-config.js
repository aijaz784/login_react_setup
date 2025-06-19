import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,
   GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
 } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFtqOzTK0AJWvCgxwx0-vJ39_E8RdCNTg",
  authDomain: "react-ecommerce-4e9ef.firebaseapp.com",
  projectId: "react-ecommerce-4e9ef",
  storageBucket: "react-ecommerce-4e9ef.firebasestorage.app",
  messagingSenderId: "325709461943",
  appId: "1:325709461943:web:4711f5a52968cb38511032",
  measurementId: "G-0B7BN7XQC8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app)
export{
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
     GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
}