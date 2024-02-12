// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-26047.firebaseapp.com",
  projectId: "mern-blog-26047",
  storageBucket: "mern-blog-26047.appspot.com",
  messagingSenderId: "549768854873",
  appId: "1:549768854873:web:426ff398b06851ef612048",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
