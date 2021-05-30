var database = firebase.database();
var prefixes = "";

//pageTokenExample();
var listRef = firebase.storage().ref();

getAll(listRef);
//recursive(thing);

for (var x = 0; x < 3; x++) {
  var hiddenInput = document.createElement("div");

  hiddenInput.setAttribute("type", "visible");

  hiddenInput.textContent = "aha hello";

  var hiddenLink = document.createElement("a");
  hiddenLink.setAttribute("class", "hidden_name");
  hiddenLink.textContent = "click";
  hiddenLink.setAttribute("href", "res_info.html");
  hiddenInput.appendChild(hiddenLink);

  var hiddenTN = document.createElement("img");
  hiddenTN.setAttribute("class", "main__img__container");
  getTN();
  //hiddenTN.setAttribute("src", hi);

  hiddenInput.appendChild(hiddenTN);

  var hiddenDesc = document.createElement("p");
  hiddenDesc.setAttribute("class", "hidden_desc");
  hiddenInput.appendChild(hiddenDesc);

  document.getElementById("main__container").appendChild(hiddenInput);
}

function getTN() {
  var storageRef = firebase.storage().ref("image/jpeg/stoner_core_jpg");

  storageRef
    .getDownloadURL()
    .then((url) => {
      // Or inserted into an <img> element
      //var img = document.getElementById("myimg");
      //   img.setAttribute("src", url);
      console.log(url);
      hiddenTN.setAttribute("src", url);
      //return url;
    })

    .catch((error) => {
      console.log("Error: Error getting URL " + error);
    });
}

// function getFileName() {}

//  function getMeta() {
//   var storageRef = firebase.storage().ref(uid + "/" + file_name);
//   storageRef
//     .getMetadata()
//     .then((metadata) => {
//       file_type = metadata.contentType;
//       tags = filterTags(tags);
//       writeUserData(uid, file_type, file_name, tags);
//     })
//     .catch((error) => {
//       console.log("Error: Error getting Metadata " + error);
//     });
// }

function listPrefixes(pList) {
  var newList = [];
  for (var x = 0; x < pList.length; x++) {
    newList.push(pList[x].name);
  }
  return newList;
}

async function pageTokenExample() {
  // Create a reference under which you want to list
  //   var storageRef = firebase.storage();
  var listRef = firebase.storage().ref();

  // Fetch the first page of 102.
  var firstPage = await listRef.list({ maxResults: 102 });
  console.log(firstPage.items);
  if (firstPage.items.length == 0) {
    console.log("nothing ");
  }

  //   console.log("first page items: ");
  //   console.log(firstPage.items);
  // console.log("Prefixes");
  prefixes = listPrefixes(firstPage.prefixes);
  console.log(prefixes);

  // Use the result.
  // processItems(firstPage.items)
  // processPrefixes(firstPage.prefixes)

  //   // Fetch the second page if there are more elements.
  //   if (firstPage.nextPageToken) {
  //     var secondPage = await listRef.list({
  //       maxResults: 100,
  //       pageToken: firstPage.nextPageToken,
  //     });
  //     // processItems(secondPage.items)
  //     // processPrefixes(secondPage.prefixes)
  //   }
}
function getAll(path) {
  //Find all the prefixes and items.
  listRef = path;
  listRef
    .listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        console.log("These are the folders: ");
        console.log(folderRef);
        getAll(folderRef);
      });
      res.items.forEach((itemRef) => {
        console.log("These are the items: ");
        console.log(itemRef);

        // All the items under listRef.
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
}
