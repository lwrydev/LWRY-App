import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV7hFRgeQN8ggN9ngNt_lppQP5qB5HZ3k",
  authDomain: "lawlivery-5f290.firebaseapp.com",
  databaseURL: "https://lawlivery-5f290-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lawlivery-5f290",
  storageBucket: "lawlivery-5f290.appspot.com",
  messagingSenderId: "308749479482",
  appId: "1:308749479482:web:15a620cb4b1ce8de850f03",
  measurementId: "G-24QRMG39CW"
};

const firebase = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(firebase);
const firestore = getFirestore(firebase);
export { firebase, database, firestore }