// Initialize Firebase

var putshit = document
  .querySelector(".myFile")
  .addEventListener("change", (e) => {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref("files/" + file.name);
    storageRef.put(file);
  });
