var provider = new firebase.auth.GoogleAuthProvider();

var startButton = document
  .querySelector("#signInB")
  .addEventListener("click", () => {
    signIn();
  });

// later to make sign in and sign out button disappear.
// function checkAuthState() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       showUserDetails(user);
//     } else {
//       alert("user not logged in");
//     }
//   });
// }
function signIn() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result.user);
      alert("User is successfully signed in");
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode);
      alert("Error signing in: " + errorMessage);
    });
}
//checkAuthState();

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("signed out");
    })
    .catch((e) => {
      console.log(e);
    });
}
