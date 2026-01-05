import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGFzfqu2g_yVuWp811BrwcgGCttxeowcE",
  authDomain: "todo-app-35f27.firebaseapp.com",
  projectId: "todo-app-35f27",
  storageBucket: "todo-app-35f27.firebasestorage.app",
  messagingSenderId: "732519307732",
  appId: "1:732519307732:web:e1e7a116fceee5d09bde41"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

