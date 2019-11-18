

import firebase from 'firebase';
import firestore from 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyB5y-arIXsPYYckbBuMADB-1Cz8EqVY7Ho",
  authDomain: "smoothies-c52dc.firebaseapp.com",
  databaseURL: "https://smoothies-c52dc.firebaseio.com",
  projectId: "smoothies-c52dc",
  storageBucket: "smoothies-c52dc.appspot.com",
  messagingSenderId: "599854275711",
  appId: "1:599854275711:web:a738c753c3a7e00cd8734a"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);



export default firebaseApp.firestore()