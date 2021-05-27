// document.getElementById("getUserInfo").addEventListener("click", (e) => {
//   gapi.load("auth2,signin2", function () {
//     var auth2 = gapi.auth2.init();
//     // auth2.then(function () {
//     //   // Current values
//     //   // var isSignedIn = auth2.isSignedIn.get();
//     //   // var currentUser = auth2.currentUser.get();
//     //   console.log("this shit works ");
//     // });
//   });
// }).catch((e) =>{
//   console.log(e);
// });

// if (auth2.isSignedIn.get()) {
//   var profile = auth2.currentUser.get().getBasicProfile();
//   console.log("ID: " + profile.getId());
//   console.log("Full Name: " + profile.getName());
//   console.log("Given Name: " + profile.getGivenName());
//   console.log("Family Name: " + profile.getFamilyName());
//   console.log("Image URL: " + profile.getImageUrl());
//   console.log("Email: " + profile.getEmail());
// }
