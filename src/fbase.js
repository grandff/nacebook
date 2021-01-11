import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage";

/*
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID     
};
*/

const firebaseConfig = {
    apiKey: "AIzaSyBbaWXxGO1RBZQ1eGtm1miBpjVLzAJ6MZM",
    authDomain: "nacebook-9a833.firebaseapp.com",
    projectId: "nacebook-9a833",
    storageBucket: "nacebook-9a833.appspot.com",
    messagingSenderId: "729788374333",
    appId: "1:729788374333:web:9b20ef8f430447195b7954"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();