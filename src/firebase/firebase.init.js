// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxYJXOexdenpBzfISDfdUsDJSQkrCrhP4",
    authDomain: "hotel-sicilia.firebaseapp.com",
    projectId: "hotel-sicilia",
    storageBucket: "hotel-sicilia.firebasestorage.app",
    messagingSenderId: "629480981272",
    appId: "1:629480981272:web:402dc1b53628947504d46d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;