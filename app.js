// //[].forEach.call(document.getElementsByClassName("main__container"), (el) => {
// let hiddenInput = document.createElement("input"),
//   mainInput = document.createElement("input");

// hiddenInput.setAttribute("type", "visible");

// // set as hidden if u want it to be hidden
// hiddenInput.setAttribute("name", el.getAttribute("file__name"));

// mainInput.setAttribute("type", "text");
// mainInput.classList.add("main-input");

// mainInput.addEventListener("input", () => {
//   mainInput.addEventListener("keydown", (e) => {
//     if (e == 13) {
//       let tag = mainInput.value;
//       if (tag.length > 0) {
//         addTag(tag);
//       }
//     }
//   });
// });
// //});

var database = firebase.database();

pageTokenExample();

for (var x = 0; x < 3; x++) {
  var hiddenInput = document.createElement("div");

  hiddenInput.setAttribute("type", "visible");

  hiddenInput.textContent = "aha hello";

  var hiddenLink = document.createElement("a");
  hiddenLink.setAttribute("class", "file__name");
  hiddenLink.textContent = "click";
  hiddenLink.setAttribute("href", "res_info.html");
  hiddenInput.appendChild(hiddenLink);

  var hiddenTN = document.createElement("img");
  //var hi = getTN();
  //   hiddenTN.setAttribute("src", getTN(););
  hiddenLink.setAttribute("class", "main__img__container");
  hiddenInput.appendChild(hiddenTN);

  var hiddenDesc = document.createElement("p");
  hiddenLink.setAttribute("class", "file__desc");
  hiddenInput.appendChild(hiddenDesc);

  document.getElementById("main__container").appendChild(hiddenInput);
}

function getTN() {
  var storageRef = firebase.storage().ref(uid + "/" + file_name);

  storageRef
    .getDownloadURL()
    .then((url) => {
      // Or inserted into an <img> element
      //   var img = document.getElementById("myimg");
      //   img.setAttribute("src", url);
      console.log(url);
      //   return url;
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
  //   console.log("first page items: ");
  //   console.log(firstPage.items);
  console.log("Prefixes");
  var prefixes = listPrefixes(firstPage.prefixes);
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
