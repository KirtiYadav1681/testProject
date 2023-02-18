import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBAek06rfgpeq_nXMGTMXt3qfQ4RXm6hnI",
    authDomain: "react-firebase-4a4d3.firebaseapp.com",
    projectId: "react-firebase-4a4d3",
    storageBucket: "react-firebase-4a4d3.appspot.com",
    messagingSenderId: "588321427021",
    appId: "1:588321427021:web:39a42d9b35fe46f7429604"
}  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);   
export const db = getFirestore(app);