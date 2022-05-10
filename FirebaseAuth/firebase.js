// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgGsXKfvZoKE4LtDyaJM3ybPS3YE0OkqY",
  authDomain: "fir-auth-19dcb.firebaseapp.com",
  projectId: "fir-auth-19dcb",
  storageBucket: "fir-auth-19dcb.appspot.com",
  messagingSenderId: "164950855809",
  appId: "1:164950855809:web:0c137ca005d8048e9dfd80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

