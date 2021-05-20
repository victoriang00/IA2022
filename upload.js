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
// var startButton = document
//   .querySelector("#uploadB")
//   .addEventListener("click", () => {
//     alert("yoo");
//   });

var uploadButton = document
  .querySelector(".myFile")
  .addEventListener("change", (e) => {
    alert(e);
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref("Thumbnails");
    storageRef.put(file);
  });

// document.querySelector(".myFile").addEventListener("change", (e) => {
//   console.log(e);
//   //   get the file name
//   //   files is an array.
// });
