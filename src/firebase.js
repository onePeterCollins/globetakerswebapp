// FIREBASE INITIALIZER
import firebase from 'firebase'

  const firebaseConfig = {
    apiKey: "AIzaSyAjeIe1ra_P4FKIEFP7RjWWIbmRWK0mvb8",
    authDomain: "globetakersonline.firebaseapp.com",
    databaseURL: "https://globetakersonline.firebaseio.com",
    projectId: "globetakersonline",
    storageBucket: "globetakersonline.appspot.com",
    messagingSenderId: "971485192431",
    appId: "1:971485192431:web:f2ed97a24d176b1e513b1a",
    measurementId: "G-NKYMEBBS5K"
  };

// Get a Firestore instance
export const db = firebase.initializeApp(firebaseConfig).firestore()

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
