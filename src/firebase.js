import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDUTSad6zgwkIgSwAJLZZcRCZ_1B7a9zw",
    authDomain: "relay-8119b.firebaseapp.com",
    databaseURL: "https://relay-8119b-default-rtdb.firebaseio.com",
    projectId: "relay-8119b",
    storageBucket: "relay-8119b.appspot.com",
    messagingSenderId: "234343216246",
    appId: "1:234343216246:web:fc54921ecde3ab3bc25b57",
    measurementId: "G-750HQQD7HC"
  };

// Initialising firebase
firebase.initializeApp(firebaseConfig);

// Exporting connection to provider for google signin
export const provider = new firebase.auth.GoogleAuthProvider();

// Exporting connection to database as a variable
export const firestore = firebase.firestore();

export default firebase;
