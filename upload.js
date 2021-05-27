// Initialize Firebase
var uid = "default";
var file = null;
checkAuthState();
function checkAuthState() {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("user is logged in");
    if (user) {
      console.log(user);
      uid = user.uid;
    } else {
      console.log("user not logged in");
      alert("Error: User not signed in, please sign in to upload");
    }
  });
}

// document.getElementById("getUserInfo").addEventListener("click", (e) => {
//   checkAuthState();
// });
var putshit = document
  .querySelector(".myFile")
  .addEventListener("change", (e) => {
    file = e.target.files[0];
    checkAuthState();
    // storageRef.put(file);
  });

document.getElementById("uploadB").addEventListener("click", () => {
  if (file == null) {
    alert("Error: no file has been attached");
  } else {
    var storageRef = firebase.storage().ref(uid + "/" + file.name);
    storageRef.put(file);
  }
});
