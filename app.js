var database = firebase.database();
var listRef = firebase.storage().ref();
var file_name = "default_name";
var file_desc = "default_desc";

//Make all the initial files show up
getAllStorage(listRef);

function getAllStorage(path) {
  console.log("get all function");
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
  console.log("create hidden inputs ");
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
  console.log("set hidden link");
  var hiddenLink = document.createElement("a");
  hiddenLink.setAttribute("class", "file__name");
  hiddenLink.textContent = file_name;

  hiddenLink.setAttribute("href", "res_info.html#" + path);
  hiddenLink.setAttribute("file_name", file_name);
  return hiddenLink;
}

function getTN(itemRef, linkDiv) {
  console.log("get tn");

  var storageRef = itemRef;
  if (storageRef.parent.fullPath.includes("image")) {
    storageRef
      .getDownloadURL()
      .then((url) => {
        // get the download url of the file
        var TNDiv = setHiddenTN(url);
        var HIdiv = setHIDiv(url, file_name);
        getDesc(itemRef, linkDiv, TNDiv, HIdiv);
      })
      .catch((error) => {
        console.log("Error: Error getting URL " + error);
      });
  } else {
    var TNDiv = setHiddenTN("no");
    var HIdiv = setHIDiv("no", file_name);
    getDesc(itemRef, linkDiv, TNDiv, HIdiv);
  }
}

function getDesc(itemRef, linkDiv, TNDiv, HIdiv) {
  console.log("get description");
  console.log(itemRef.fullPath);
  var descRef = firebase.database().ref(itemRef.fullPath);
  descRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data.desc);
    file_desc = data.desc;

    console.log("about to set hidden desc");
    var descDiv = setHiddenDesc(file_desc);
    console.log("about to add input to screen");
    addInput(linkDiv, TNDiv, descDiv, HIdiv);
  });
}

function setHiddenDesc(desc) {
  console.log("set description");
  var hiddenDesc = document.createElement("p");
  hiddenDesc.setAttribute("class", "file__desc");
  hiddenDesc.innerText = desc;
  return hiddenDesc;
}

function setHiddenTN(url) {
  console.log("set hidden tn");
  var hiddenTN = document.createElement("img");
  hiddenTN.setAttribute("class", "main__img__container");
  if (url != "no") {
    hiddenTN.setAttribute("src", url);
  }

  return hiddenTN;
}

function setHIDiv(url, name) {
  console.log("append HI div");
  var hiddenInfo = document.createElement("div");
  hiddenInfo.setAttribute("class", "hiddenInfo");
  hiddenInfo.setAttribute("file_url", url);
  hiddenInfo.setAttribute("file_name", name);
  return hiddenInfo;
}

// Append div1 and div2 to the outer div, hiddenInput
function addInput(linkDiv, TNDiv, descDiv, HIdiv) {
  console.log("add input to screen");
  var hiddenInput = document.createElement("div");

  hiddenInput.appendChild(linkDiv);
  hiddenInput.appendChild(TNDiv);
  hiddenInput.appendChild(descDiv);
  hiddenInput.appendChild(HIdiv);

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
  console.log("filter all resources");
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

  document.querySelectorAll(".hiddenDivs").forEach((e) => e.remove());
  filterAll(filteredTags);
});
