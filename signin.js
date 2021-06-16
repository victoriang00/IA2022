var provider = new firebase.auth.GoogleAuthProvider();

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
