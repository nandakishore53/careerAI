// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaNsoH5lltmxAAdlXCBoTBifduACwK18c",
  authDomain: "career-ai-platform-5ecf3.firebaseapp.com",
  projectId: "career-ai-platform-5ecf3",
  storageBucket: "career-ai-platform-5ecf3.appspot.com", // ✅ corrected
  messagingSenderId: "548019892169",
  appId: "1:548019892169:web:4951cf2a4cde7e9021c218"
};

const app = initializeApp(firebaseConfig);

// ✅ Export Auth instance for login/signup
export const auth = getAuth(app);
