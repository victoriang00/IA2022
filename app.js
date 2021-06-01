var database = firebase.database();

var listRef = firebase.storage().ref();


//Make all the initial files show up
getAll(listRef);

function passVars() {
  var Student = {
    file_name: "k"
    name: "ABC",
    age: 18,
    dept: "CSE",
    score: 90,
  };
  module.exports = { Student };
}

// Create div for the thumbnail and set the image to the thumbnail
function hiddenTN(url, div2) {
  var hiddenTN = document.createElement("img");
  hiddenTN.setAttribute("class", "main__img__container");
  hiddenTN.setAttribute("src", url);
  addInput(div2, hiddenTN);
}

// Append div1 and div2 to the outer div, hiddenInput
function addInput(div, div2) {
  var hiddenInput = document.createElement("div");

  hiddenInput.appendChild(div);
  hiddenInput.appendChild(div2);
  document.getElementById("main__container").appendChild(hiddenInput);
  hiddenInput.setAttribute("type", "visible");
}

function getTN(itemRef, div2) {
  var storageRef = itemRef;

  storageRef
    .getDownloadURL()
    .then((url) => {
      hiddenTN(url, div2);
    })

    .catch((error) => {
      console.log("Error: Error getting URL " + error);
    });
}

function hiddenLink(name) {
  var hiddenLink = document.createElement("a");
  hiddenLink.setAttribute("class", "hidden_name");
  hiddenLink.textContent = name;

  hiddenLink.setAttribute("href", "res_info.html");
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
      res.prefixes.forEach((folderRef) => {
        console.log("These are the folders: ");
        console.log(folderRef);
        getAll(folderRef);
      });
      res.items.forEach((itemRef) => {
        console.log("These are the items: ");
        console.log(itemRef);

        var name = itemRef.name;
        var link = hiddenLink(name);
        getTN(itemRef, link);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Error: Error getting all files." + error);
    });
}

function filterAll(path, tags) {
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

        var name = itemRef.name;
        var link = hiddenLink(name);
        getTN(itemRef, link);
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
  filteredTags = filterTags(tags);
});
