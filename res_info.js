var fullPath = window.location.hash.substring(1);
console.log(fullPath);
var n = fullPath.lastIndexOf("/");
var parentPath = fullPath.substring(0, n);

var file_name = fullPath.substring(n + 1);
console.log(parentPath);
console.log(file_name);
var tags = [];
var user = [];
var desc = "";

document.title = file_name.replace(/_\++/g, " ");
getStorage(parentPath);
getDB(fullPath);

function getStorage(parentPath) {
  var listRef = firebase.storage().ref(parentPath);
  // Find all the prefixes and items.
  listRef
    .listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        if (itemRef.name == file_name) {
          itemRef
            .updateMetadata({ contentDisposition: "inline" })
            .then(function () {
              itemRef
                .getDownloadURL()
                .then(function (url) {
                  var iframe1 = document.getElementById("pdf-js-viewer");
                  iframe1.src = url;
                })
                .catch(function (error) {
                  console.log("Error getting DownloadUrl: " + error);
                });
            });
        }
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(
        "Error: There was an error getting the item from firebase storage" +
          error
      );
    });
}

function getDB(ref) {
  var fileRef = firebase.database().ref(ref);

  fileRef.on(
    "value",
    (snapshot) => {
      var data = snapshot.val();

      console.log("Logged Data: ");
      console.log(data);
      tags = data.tags;
      user = data.user;
    },
    function (error) {
      console.error("Error filtering resources " + error);
    }
  );
}
