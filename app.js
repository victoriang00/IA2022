// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCHwwp-hRiL8ohdDpWOHIVN9wNYE9q5TXI",
  authDomain: "ia2022.firebaseapp.com",
  projectId: "ia2022",
  databaseURL: "https://ia2022-default-rtdb.firebaseio.com",
  storageBucket: "ia2022.appspot.com",
  messagingSenderId: "318603254564",
  appId: "1:318603254564:web:89865e39a88f1bf9d7f1b1",
  measurementId: "G-X78PMBTXKB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById("demo").addEventListener("click", myFunction);

function myFunction() {
  document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
}

document
  .getElementById("signin__btn")
  .addEventListener("click", signInFunction());

function signInFunction() {
  alert("yes");
}
