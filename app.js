var database = firebase.database();
var listRef = firebase.storage().ref();
var file_name = "default_name";
var file_desc = "default_desc";

//Make all the initial files show up
getAllStorage(listRef);

function getAllStorage(path) {
  //Find all the prefixes and items.
  listRef = path;
  listRef
    .listAll()
    .then((res) => {
      // get all paths
      res.prefixes.forEach((folderRef) => {
        folderRef = folderRef;
        getAllStorage(folderRef);
        console.log(folderRef);
      });
      //get all items in paths
      res.items.forEach((itemRef) => {
        file_name = itemRef.name;
        var linkDiv = setHiddenLink(file_name, itemRef.fullPath);
        getTN(itemRef, linkDiv);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Error: Error getting all files." + error);
    });
}

[].forEach.call(document.getElementsByClassName("home__search"), (el) => {
  //Create hidden elements
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
  // Allow tags to be deleted when the delete button is pressed
  mainInput.addEventListener("keydown", (e) => {
    let keyCode = e.which || e.keyCode;
    if (keyCode == 8 && mainInput.value.length === 0 && tags.length > 0) {
      removeTag(tags.length - 1);
      console.log(tags);
    }
  });

  // Append the tags to the main screen
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

function setHiddenLink(file_name, path) {
  var hiddenLink = document.createElement("a");
  hiddenLink.setAttribute("class", "file__name");
  hiddenLink.textContent = file_name;

  hiddenLink.setAttribute("href", "res_info.html#" + path);
  hiddenLink.setAttribute("file_name", file_name);
  return hiddenLink;
}

function getTN(itemRef, linkDiv) {
  var storageRef = itemRef;
  if (storageRef.parent.fullPath.includes("image")) {
    storageRef
      .getDownloadURL()
      .then((url) => {
        // get the download url of the file
        var TNDiv = setHiddenTN(url);
        getDesc(itemRef, linkDiv, TNDiv);
      })
      .catch((error) => {
        console.log("Error: Error getting URL " + error);
      });
  } else {
    var TNDiv = setHiddenTN("no");
    getDesc(itemRef, linkDiv, TNDiv);
  }
}

function getDesc(itemRef, linkDiv, TNDiv) {
  const dbRef = firebase.database().ref(itemRef.fullPath);
  dbRef
    .on("value", (snapshot) => {
      const data = snapshot.val();
      file_desc = data.desc;
      var descDiv = setHiddenDesc(file_desc);

      addInput(linkDiv, TNDiv, descDiv);
    })
    .catch((error) => {
      console.log("Error getting description: " + error);
    });
}

function setHiddenDesc(desc) {
  var hiddenDesc = document.createElement("p");
  hiddenDesc.setAttribute("class", "file__desc");
  hiddenDesc.innerText = desc;
  return hiddenDesc;
}

function setHiddenTN(url) {
  var hiddenTN = document.createElement("img");
  hiddenTN.setAttribute("class", "main__img__container");
  if (url != "no") {
    hiddenTN.setAttribute("src", url);
  }

  return hiddenTN;
}

// Append div1 and div2 to the outer div, hiddenInput
function addInput(linkDiv, TNDiv, descDiv) {
  var hiddenInput = document.createElement("div");

  hiddenInput.appendChild(linkDiv);
  hiddenInput.appendChild(TNDiv);
  hiddenInput.appendChild(descDiv);

  document.getElementById("main__container").appendChild(hiddenInput);
  hiddenInput.setAttribute("type", "visible");
  hiddenInput.setAttribute("class", "hiddenDivs");
}

function listPrefixes(pList) {
  var newList = [];
  for (var x = 0; x < pList.length; x++) {
    newList.push(pList[x].name);
  }
  return newList;
}

function filterAll(tags) {
  //Find all the prefixes and items.
  var fileRef = firebase.database().ref();

  var image = tags.map((e) => e.toLocaleLowerCase()).includes("image");
  var pdf = tags.map((e) => e.toLocaleLowerCase()).includes("pdf");
  var audio = tags.map((e) => e.toLocaleLowerCase()).includes("audio");

  if (image) {
    fileRef = firebase.storage().ref("image");
    getAllStorage(fileRef);
  }
  if (pdf) {
    fileRef = firebase.storage().ref("application/pdf");
    getAllStorage(fileRef);
  }
  if (audio) {
    fileRef = firebase.storage().ref("audio");
    getAllStorage(fileRef);
  }
}

function filterAllTags(tags) {
  var fileRef = firebase.database().ref("allTags/match/matched");
  fileRef.on("value", (snapshot) => {
    const data = snapshot.val();

    var keys = Object.keys(data);

    keys.forEach((key) => {
      if (tags.includes(key)) {
        var values = data[key];
        console.log(values);
        values.forEach((value) => {
          var itemRef = firebase.storage().ref(value);
          console.log(itemRef.fullPath);
          var fullpath = itemRef.fullPath;

          var file_type = fullpath.substring(0, fullpath.lastIndexOf("/") + 1);
          console.log(file_type);

          var file_name = fullpath.substring(
            fullpath.lastIndexOf("/") + 1,
            fullpath.length
          );
          console.log(file_name);
          var itemPath = firebase.storage().ref(file_type);
          getSpecific(itemPath, file_name);
        });
      }
    });
  });
}

function getSpecific(path, name) {
  //Find all the prefixes and items.
  listRef = path;
  listRef
    .listAll()
    .then((res) => {
      // get all paths
      res.prefixes.forEach((folderRef) => {
        folderRef = folderRef;
        getAllStorage(folderRef);
      });
      //get all items in paths
      res.items.forEach((itemRef) => {
        if (itemRef.name == name) {
          file_name = itemRef.name;
          var linkDiv = setHiddenLink(file_name, itemRef.fullPath);
          getTN(itemRef, linkDiv);
        } else {
          console.log("none");
        }
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
  console.log("filter all tags");
  var filteredTags = [];
  for (var i = 0; i < tags.length; i++) {
    filteredTags.push(tags[i].text);
  }
  console.log(filteredTags);
  return filteredTags;
}

// Search button
document.getElementById("search__btn").addEventListener("click", () => {
  var filteredTags = filterTags(tags);

  if (filteredTags.length == 0) {
    console.log("dis bitch empty");
    alert("please input a tag to filter");
  } else {
    document.querySelectorAll(".hiddenDivs").forEach((e) => e.remove());
    filterAll(filteredTags);
    filterAllTags(filteredTags);
  }
});
