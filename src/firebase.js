import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUT22FRcc4AccKTefp0f749wKFsnXK9P8",
  authDomain: "songpediahm.firebaseapp.com",
  projectId: "songpediahm",
  storageBucket: "songpediahm.firebasestorage.app",
  messagingSenderId: "301125407896",
  appId: "1:301125407896:web:c33b13d5d3c78c3577aced",
  measurementId: "G-JC71HCV06N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
