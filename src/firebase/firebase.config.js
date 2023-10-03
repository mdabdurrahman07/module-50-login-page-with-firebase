// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4Bn3vXZlLKg_eiBZkgd0lwU1aYZlcmeE",
  authDomain: "module50-login-page-firebase.firebaseapp.com",
  projectId: "module50-login-page-firebase",
  storageBucket: "module50-login-page-firebase.appspot.com",
  messagingSenderId: "108505385690",
  appId: "1:108505385690:web:956dfbc88a83e51bc8f3e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth