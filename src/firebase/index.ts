// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeApeKAvWpgR6RvxRE28J2KU1QL6VI3F8",
  authDomain: "colaboractivo-v2.firebaseapp.com",
  projectId: "colaboractivo-v2",
  storageBucket: "colaboractivo-v2.appspot.com",
  messagingSenderId: "246777968531",
  appId: "1:246777968531:web:0c18d9a44b76d4c5065a66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const db = getFirestore(app);

const storage = getStorage();


export { app, storage }

