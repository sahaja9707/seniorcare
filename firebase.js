import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFZ34aacBWUo-cLGSxpr_tYJwiJE1a38g",
  authDomain: "seniorcare-f5dae.firebaseapp.com",
  projectId: "seniorcare-f5dae",
  storageBucket: "seniorcare-f5dae.firebasestorage.app",
  messagingSenderId: "918827170373",
  appId: "1:918827170373:web:3211154aec1461b79bc12c",
  measurementId: "G-ND8JPCLTCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);