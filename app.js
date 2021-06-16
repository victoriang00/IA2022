var database = firebase.database();
var listRef = firebase.storage().ref();

//Make all the initial files show up
getAll(listRef);

function hiddenInfo(url, name) {
  var hiddenInfo = document.createElement("div");
  hiddenInfo.setAttribute("class", "hiddenInfo");
  hiddenInfo.setAttribute("file_url", url);
  hiddenInfo.setAttribute("file_name", name);
  return hiddenInfo;
}

// Create div for the thumbnail and set the image to the thumbnail
function hiddenTN(url, div2) {
  var hiddenTN = document.createElement("img");
  hiddenTN.setAttribute("class", "main__img__container");
  if (url != "no") {
    hiddenTN.setAttribute("src", url);
  }

  var name = div2.innerHTML;
  var hInfo = hiddenInfo(url, name);

  addInput(div2, hiddenTN, hInfo);
}

// Append div1 and div2 to the outer div, hiddenInput
function addInput(div, div2, div3) {
  var hiddenInput = document.createElement("div");

  hiddenInput.appendChild(div);
  hiddenInput.appendChild(div2);
  hiddenInput.appendChild(div3);

  document.getElementById("main__container").appendChild(hiddenInput);
  hiddenInput.setAttribute("type", "visible");
  hiddenInput.setAttribute("class", "hiddenDivs");
}

function getTN(itemRef, div2) {
  // div2 refers to the second
  var storageRef = itemRef;
  if (storageRef.parent.fullPath.includes("image")) {
    storageRef
      .getDownloadURL()
      .then((url) => {
        // get the download url of the file
        hiddenTN(url, div2);
      })

      .catch((error) => {
        console.log("Error: Error getting URL " + error);
      });
    // hiddenTN()
  } else {
    hiddenTN("no", div2);
  }
}

function hiddenLink(name, path) {
  var hiddenLink = document.createElement("a");
  hiddenLink.setAttribute("class", "hidden_name");
  hiddenLink.textContent = name;

  hiddenLink.setAttribute("href", "res_info.html#" + path);
  hiddenLink.setAttribute("file_name", name);
  // constants.file_name = name;

  return hiddenLink;
}

function listPrefixes(pList) {
  var newList = [];
  for (var x = 0; x < pList.length; x++) {
    newList.push(pList[x].name);
  }
  return newList;
}

function getAll(path) {
  //Find all the prefixes and items.
  listRef = path;
  listRef
    .listAll()
    .then((res) => {
      // get all paths
      res.prefixes.forEach((folderRef) => {
        folderRef = folderRef;
        getAll(folderRef);
      });
      //get all items in paths
      res.items.forEach((itemRef) => {
        var name = itemRef.name;
        var link = hiddenLink(name, itemRef.fullPath);
        getTN(itemRef, link);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Error: Error getting all files." + error);
    });
}

function filterAll(tags) {
  //Find all the prefixes and items.
  var fileRef = firebase.database().ref();
  var image = tags.map((e) => e.toLocaleLowerCase()).includes("image");

  var pdf = tags.map((e) => e.toLocaleLowerCase()).includes("pdf");
  var audio = tags.map((e) => e.toLocaleLowerCase()).includes("audio");

  if (image) {
    fileRef = firebase.storage().ref("image");
    getAll(fileRef);
  }
  if (pdf) {
    fileRef = firebase.storage().ref("application/pdf");
    getAll(fileRef);
  }
  if (audio) {
    fileRef = firebase.storage().ref("audio");
    getAll(fileRef);
  }
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

[].forEach.call(document.getElementsByClassName("home__search"), (el) => {
  let hiddenInput = document.createElement("input"),
    mainInput = document.getElementById("tags-search");

  hiddenInput.setAttribute("type", "hidden");

  hiddenInput.setAttribute("name", "data-name");
  hiddenInput.setAttribute("id", "tagDiv");

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
    insertAfter(tag.element, mainInput);
    mainInput.value = "";
    refreshTags();
    filterTags(tags);
  }

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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

// Search button
document.getElementById("search__btn").addEventListener("click", () => {
  var filteredTags = filterTags(tags);

  document.querySelectorAll(".hiddenDivs").forEach((e) => e.remove());
  filterAll(filteredTags);
});
