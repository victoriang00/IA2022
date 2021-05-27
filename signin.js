var provider = new firebase.auth.GoogleAuthProvider();

var startButton = document
  .querySelector("#signInB")
  .addEventListener("click", () => {
    signIn();
  });
function showUserDetails(user) {
  document.getElementById("userdetails").innerHTML = `
  <p>Name: ${user.displayName}</p>
  <p>Email: ${user.email}</p>
  `;
}
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
      // /** @type {firebase.auth.OAuthCredential} */
      // var credential = result.credential;

      // // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = credential.accessToken;
      // // The signed-in user info.
      // var user = result.user;
      console.log(result.user);
      showUserDetails(result.user);
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
  //check video 18:36 to hide the buttons and shit
}
