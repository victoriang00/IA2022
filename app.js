var database = firebase.database();
var prefixes = "";
var itemRef = "";

//pageTokenExample();
var listRef = firebase.storage().ref();

//Make all the initial files show up
getAll(listRef);
// function addRes() {
//   var hiddenInput = document.createElement("div");

//   hiddenInput.setAttribute("type", "visible");
//   hiddenInput.textContent = "aha hello";

//   var hiddenLink = document.createElement("a");
//   hiddenLink.setAttribute("class", "hidden_name");
//   hiddenLink.textContent = "click";
//   hiddenLink.setAttribute("href", "res_info.html");
//   hiddenInput.appendChild(hiddenLink);

//   getTN(itemRef);
//   hiddenInput.appendChild(hiddenTN);

//   var hiddenDesc = document.createElement("p");
//   hiddenDesc.setAttribute("class", "hidden_desc");
//   hiddenInput.appendChild(hiddenDesc);

//   document.getElementById("main__container").appendChild(hiddenInput);
// }

function hiddenTN(url) {
  var hiddenTN = document.createElement("img");
  hiddenTN.setAttribute("class", "main__img__container");
  hiddenTN.setAttribute("src", url);
  return hiddenTN;
}
function addInput(TN) {
  var hiddenInput = document.createElement("div");
  hiddenInput.setAttribute("type", "visible");
  hiddenInput.textContent = "aha hello";

  hiddenInput.appendChild(TN);
  document.getElementById("main__container").appendChild(hiddenInput);
}

function getTN(itemRef) {
  var storageRef = itemRef;

  storageRef
    .getDownloadURL()
    .then((url) => {
      // console.log(url);
      // addInput(hiddenTN(url));
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
        // console.log("These are the folders: ");
        // console.log(folderRef);
        getAll(folderRef);
      });
      res.items.forEach((itemRef) => {
        // console.log("These are the items: ");
        // console.log(itemRef);
        getTN(itemRef);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Error: Error getting all files." + error);
    });
}

// TAGS RELATED THINGS
var tags = [];

function filterTags(tags) {
  var filteredTags = [];
  for (var i = 0; i < tags.length; i++) {
    filteredTags.push(tags[i].text);
  }
  console.log(filteredTags);
  return filteredTags;
}

[].forEach.call(document.getElementsByClassName("tags-search"), (el) => {
  console.log("does it work");
  let hiddenInput = document.createElement("input"),
    mainInput = document.createElement("input");

  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", el.getAttribute("data-name"));

  mainInput.setAttribute("type", "text");
  mainInput.classList.add("main-input");

  mainInput.addEventListener("input", () => {
    mainInput.addEventListener("keydown", (e) => {
      let keyCode = e.which || e.keyCode;
      if (keyCode == 13) {
        let tag = mainInput.value;
        if (tag.length > 0) {
          addTag(tag);
        }
      }
    });
  });
  // make the delete thing work again
  mainInput.addEventListener("keydown", (e) => {
    let keyCode = e || e.keyCode;
    if (keyCode == 8 && mainInput.value.length === 0 && tags.length > 0) {
      removeTag(tags.length - 1);
      console.log(tags);
    }
  });

  el.appendChild(mainInput);
  el.appendChild(hiddenInput);

  function addTag(text) {
    let tag = {
      text: text,
      element: document.createElement("span"),
    };
    tag.element.classList.add("tag");
    tag.element.textContent = tag.text;

    let closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    tag.element.appendChild(closeBtn);

    closeBtn.addEventListener("click", () => {
      removeTag(tags.indexOf(tag));
    });

    tags.push(tag);
    el.insertBefore(tag.element, mainInput);
    mainInput.value = "";
    refreshTags();
    filterTags(tags);
  }

  function removeTag(index) {
    let tag = tags[index];
    tags.splice(index, 1);
    el.removeChild(tag.element);
    refreshTags();
    filterTags(tags);
  }

  function refreshTags() {
    let tagsList = [];
    tags.forEach((t) => {
      tagsList.push(t.text);
    });
    hiddenInput.value = tagsList.join(",");
  }
});
