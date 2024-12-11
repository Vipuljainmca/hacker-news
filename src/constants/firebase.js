import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import process from 'process';

// const firebaseConfig = {
//     apiKey: "AIzaSyAm7TEMDrbEMas9DiGVeRvvyxcPiUDR22M",
//     authDomain: "surverguy-cecb0.firebaseapp.com",
//     projectId: "surverguy-cecb0",
//     storageBucket: "surverguy-cecb0.firebasestorage.app",
//     messagingSenderId: "911371357449",
//     appId: "1:911371357449:web:147c14de0bfe4c9cb557d8",
//     measurementId: "G-BBJGLGHT6V"
// };

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
