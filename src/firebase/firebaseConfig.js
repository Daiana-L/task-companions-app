import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBWVmcZZ4Iy9V06HAlJe_01m1VHpJxTTQ8",
    authDomain: "taskcompanions-app.firebaseapp.com",
    projectId: "taskcompanions-app",
    storageBucket: "taskcompanions-app.firebasestorage.app",
    messagingSenderId: "532931758014",
    appId: "1:532931758014:web:21fe50243f58b38256dbef",
    measurementId: "G-2071L192BS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db , app};
