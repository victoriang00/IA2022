// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
src = "https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js";

//TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries
src = "https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js";
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
var startButton = document
  .querySelector("#signin__btn")
  .addEventListener("click", () => {
    startGame();
  });

function startGame() {
  var email = document.getElementById("email__input").value;
  var pass = document.getElementById("pass__input").value;
  alert(email + pass);
}
