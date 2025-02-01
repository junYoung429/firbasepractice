/* public/app.js */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyA2VOtn6QltQpfq2GsGbTq1bBy5XoE0D5Q",
    authDomain: "gggg-2607d.firebaseapp.com",
    projectId: "gggg-2607d",
    storageBucket: "gggg-2607d.firebasestorage.app",
    messagingSenderId: "995989915812",
    appId: "1:995989915812:web:ea7bcf2935cf0d39973e31",
    measurementId: "G-P8W7MRLBTM"
  };
  

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
