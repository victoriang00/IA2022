/* add click effect*/
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");

/* listen to click event */
menu.addEventListener("click", function () {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
});

// The core Firebase JS SDK is always required and must be listed first
src = "https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js";

//TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries
src = "https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCHwwp-hRiL8ohdDpWOHIVN9wNYE9q5TXI",
  authDomain: "ia2022.firebaseapp.com",
  projectId: "ia2022",
  storageBucket: "ia2022.appspot.com",
  messagingSenderId: "318603254564",
  appId: "1:318603254564:web:89865e39a88f1bf9d7f1b1",
  measurementId: "G-X78PMBTXKB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
