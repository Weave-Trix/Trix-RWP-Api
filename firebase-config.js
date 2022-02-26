// Import the functions you need from the SDKs you need
import 'firebase/firestore';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import dotenv from 'dotenv';
import firebase from 'firebase/compat/app';
import { initializeApp } from '@firebase/app';
import { getFirestore } from 'firebase/firestore';
dotenv.config;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "trix-rwp.firebaseapp.com",
  databaseURL: "https://trix-rwp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trix-rwp",
  storageBucket: "trix-rwp.appspot.com",
  messagingSenderId: "454501759204",
  appId: "1:454501759204:web:4f6e2f205378bdf3aad4f1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);