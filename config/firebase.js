import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPFITkSmr1rmi67frHJY6O-wqFcqPj7k8",
  authDomain: "lwryapp-52af8.firebaseapp.com",
  databaseURL: "https://lwryapp-52af8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lwryapp-52af8",
  storageBucket: "lwryapp-52af8.appspot.com",
  messagingSenderId: "519015083549",
  appId: "1:519015083549:web:e3a7938969579e264da0f4",
  measurementId: "G-7JKEB0REF7"
};

const firebase = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(firebase);
const firestore = getFirestore(firebase);
export { firebase, database, firestore }