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

var provider = new firebase.auth.GoogleAuthProvider();

var startButton = document
  .querySelector("#signInB")
  .addEventListener("click", () => {
    signIn();
  });

function signIn() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      alert("Successfully Signed In");
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert("Error signing in: " + errorMessage);
    });
}
