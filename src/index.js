import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Analytics } from '@vercel/analytics/react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔹 Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUT22FRcc4AccKTefp0f749wKFsnXK9P8",
  authDomain: "songpediahm.firebaseapp.com",
  projectId: "songpediahm",
  storageBucket: "songpediahm.firebasestorage.app",
  messagingSenderId: "301125407896",
  appId: "1:301125407896:web:c33b13d5d3c78c3577aced",
  measurementId: "G-JC71HCV06N"
};


// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <React.StrictMode>
      <App auth={auth} />
    </React.StrictMode>
    <Analytics />
  </>
);

reportWebVitals();
